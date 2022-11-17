import { useMemo } from "react";
import { Form } from "formik";
import { useCartContext } from "@context";
import { PSP } from "@typing/enums";

import type { PaymentFormProps } from "@typing/proptypes";

import {
  ChoosePayment,
  DLocalPayment,
  ForestPayment,
  GenericsPayment,
  OpenpayPayment,
  SummaryPayment
} from "@components";
import PayU from "components/payment/PayU";

export default function PaymentForm({ configuration, pspActive, values }: PaymentFormProps) {
  const { cart } = useCartContext();

  const activeDocument = (pspActive.pspId === PSP.DLOCAL || pspActive.pspId === PSP.PAYU);

  const currencies = useMemo(() => pspActive.currency[cart.country]?.map((currency) => ({
    label: currency as string,
    value: currency as string
  })) ?? [], [pspActive.currency, cart.country]);
  const methods = useMemo(() => (
    pspActive.method[cart.country]?.[cart.exchangeCurrency] ?? []
  ), [pspActive.method, cart.country, cart.exchangeCurrency]);
  const documentFields = useMemo(() => pspActive.document?.[cart.country], [pspActive.document, cart.country]);

  return (
    <Form className="payment__form">
      <div className="payment__side">
        <div
          className="payment__psps"
          role="group"
          aria-labelledby="all-psps-options"
        >
          <ChoosePayment
            configuration={configuration}
            values={values}
            pspActive={pspActive}
          />
        </div>
        <GenericsPayment
          activeDocument={activeDocument}
          currencies={currencies}
          methods={methods}
          {...documentFields}
        />
        {cart.idPsp === PSP.DLOCAL ? (
          <DLocalPayment name={values.name} document={values.document} />
        ) : null}
        {cart.idPsp === PSP.FOREST ? (<ForestPayment />) : null}
        {/* {cart.idPsp === PSP.PAYU ? (<PayU />) : null} */}
        {cart.idPsp === PSP.OPENPAY ? (<OpenpayPayment />) : null}
        {/* {cart.idPsp === PSP.TODITOPAY ? (Nothing for Toditopay) : null} */}
        {/* {cart.idPsp === PSP.FLOW ? (Nothing for Flow) : null} */}
      </div>
      <div className="payment__side">
        <SummaryPayment terms={values.terms} />
      </div>
    </Form>
  );
}
