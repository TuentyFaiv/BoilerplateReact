import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { DEFAULT_PSP_ACTIVE } from "@utils";
import { useCartContext } from "@context";
import { withAuth } from "@hoc";

import type { HTTPConnectionReturn } from "@typing/contexts";
import type { ReturnConfigPsps } from "@typing/services";

import "@stylesPages/Payment.scss";

import { PaymentFormik } from "@containers";
import { ModalPayment } from "@components";

function Payment() {
  const { payload: configuration } = useLoaderData() as HTTPConnectionReturn<ReturnConfigPsps[]>;
  const { cart } = useCartContext();
  const [pspActive, setPspActive] = useState<ReturnConfigPsps>(DEFAULT_PSP_ACTIVE);

  useEffect(() => {
    if (cart.idPsp) {
      const psp = configuration.find(({ pspId }) => pspId === cart.idPsp) ?? DEFAULT_PSP_ACTIVE;
      setPspActive(psp);
    }
    if (Number.isNaN(cart.idPsp)) {
      setPspActive(DEFAULT_PSP_ACTIVE);
    }
  }, [cart.idPsp, configuration]);
  return (
    <section className="payment">
      <ModalPayment />
      <div className="payment__content">
        <PaymentFormik
          configuration={configuration}
          pspActive={pspActive}
        />
      </div>
    </section>
  );
}

export default withAuth(Payment);
