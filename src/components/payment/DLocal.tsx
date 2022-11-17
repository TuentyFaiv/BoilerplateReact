/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import { showError } from "@utils";
import config from "@config";
import { usePaymentExternalService } from "@services";
import { useCartContext } from "@context";
import { Method } from "@typing/enums";

import type { DLocalProps } from "@typing/proptypes";
import type { PspsWindow } from "@typing/payment";

import { ButtonGo, Input, LoaderPage } from "@components";

// CardField
const dlocal = (window as unknown as PspsWindow).dlocal(config.dlocal_apikey);
const fields = dlocal.fields({
  locale: "es",
  country: "MX"
});
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: "18px",
    color: "#32325d"
  }
};
const card = fields.create("card", { style });

export default function DLocal({ document, name }: DLocalProps) {
  const { t } = useTranslation("payment", { useSuspense: false });
  const { cart } = useCartContext();
  const { dlocalCard } = usePaymentExternalService();
  const [loader, setLoader] = useState(false);
  const cardInputRef = useRef<HTMLDivElement | null>(null);

  const handlePay = async () => {
    try {
      setLoader(true);
      if (!name) {
        swal({
          title: "Error",
          text: t("error-dlocal-card-name"),
          icon: "error"
        });
      } else {
        const { token } = await dlocal.createToken(card, { name });
        await dlocalCard({
          token,
          document,
          cardholder: name
        });
        swal("success", "Pago realizado con exito", "success");
      }
    } catch (error) {
      showError(error, t);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const cardInput = cardInputRef.current;
    if (cardInput) {
      card.mount(cardInput);
    }
  }, []);

  return (cart.method === Method.CARD ? (
    <>
      {loader ? <LoaderPage /> : null}
      <Input
        label={t("holder-name")}
        type="text"
        placeholder={t("holder-name")}
        name="name"
      />
      <div ref={cardInputRef} className="field__input field__input--dlocal" />
      <ButtonGo
        text={t("pay")}
        disabled={loader}
        onClick={handlePay}
        size="big"
      />
    </>
  ) : null);
}
