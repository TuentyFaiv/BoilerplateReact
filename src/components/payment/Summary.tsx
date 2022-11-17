import { useTranslation } from "react-i18next";
import config from "@config";
import { useCartContext } from "@context";
import { Method, PSP } from "@typing/enums";

import type { SummaryProps } from "@typing/proptypes";

import OpenpayLogo from "@images/openpay-logo.png";

import { ButtonGo, Checkbox } from "@components";

export default function Summary({ terms }: SummaryProps) {
  const { cart } = useCartContext();
  const { t } = useTranslation("payment", { useSuspense: false });

  return (
    <section className="payment__summary">
      <article className="payment__article">
        <p className="payment__article-title">
          {cart.description}
        </p>
        {cart.idPsp === PSP.OPENPAY ? <img src={OpenpayLogo} alt="Openpay" className="payment__openpay-logo" /> : null}
        <p className="payment__article-price">
          <span className="payment__article-price--box">
            {t("total")}
          </span>
          <span className="payment__article-price--flex">
            {cart.exchangeAmount}
            <span className="payment__article-price--box">
              {cart.exchangeCurrency}
            </span>
          </span>
        </p>
      </article>
      {cart.idPsp === PSP.BANWIRE ? (
        <Checkbox
          checked={terms}
          name="terms"
          label={t("terms-legend", { ns: "formik" })}
          payment
        >
          <a
            className="payment__link payment__link--terms"
            href={`${config.api_local}?modal=terms `}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("terms-legend2", { ns: "formik" })}
          </a>
        </Checkbox>
      ) : null}
      {cart.idPsp === PSP.OPENPAY ? (
        <>
          <a
            className="payment__link"
            href={`${config.api_local}?modal=terms `}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("terms", { ns: "header" })}
          </a>
          <span className="payment__openpay-address">
            Florencia 57, 5532082413, support@traderbotic.com
          </span>
        </>
      ) : null}
      {cart.idPsp === PSP.DLOCAL && cart.method === Method.CARD ? null : (
        <ButtonGo type="submit" text={t("pay")} size="big" />
      )}
    </section>
  );
}
