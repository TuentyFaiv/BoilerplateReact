import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { DEFAULT_PAYMENT_VALUES, PaymentSchema } from "@schemas";
import { submitForm, usePaymentService } from "@services";
import { useCartContext } from "@context";
import { Actions, Method, PSP } from "@typing/enums";

import type { PaymentFormikProps } from "@typing/proptypes";
import type { PaymentValues } from "@typing/services";
import type { BootPayment } from "@typing/types";

import { PaymentForm } from "@containers";
import { LoaderPage } from "@components";
import { useAntifraudTokens } from "@hooks";

export default function PaymentFormik({ configuration, pspActive }: PaymentFormikProps) {
  const { cart, dispatch } = useCartContext();
  const { t } = useTranslation("payment", { useSuspense: false });
  const tokens = useAntifraudTokens();

  const {
    dlocalPay,
    forestPay,
    toditopayPay,
    openpayPay,
    flowPay,
    openLink,
    banwirePay,
    conektaPay,
    payuPay
  } = usePaymentService();
  const navigate = useNavigate();

  const boot: BootPayment = useMemo(() => ({
    required: t("required"),
    numbers: t("only-numbers"),
    methods: t("valid-methods")
  }), [t]);

  const initialValues = useMemo(() => ({
    ...DEFAULT_PAYMENT_VALUES,
    psp: `${pspActive.pspId}`,
    method: `${cart.method}`,
    currency: `${cart.exchangeCurrency}`
  }), [pspActive.pspId, cart.method, cart.exchangeCurrency]);

  const validationSchema = useMemo(() => PaymentSchema({
    psp: cart.idPsp,
    boot,
    method: cart.method
  }), [cart.idPsp, cart.method, boot]);

  const handleClear = () => {
    dispatch({ type: Actions.CLEAR_CART });
    navigate("/", { replace: true });
  };

  const handleSubmit = submitForm<PaymentValues>(async (values, actions) => {
    let urlPayment = "";

    if (cart.idPsp === PSP.PAYU) {
      const date = new Date();
      const foo = date.setDate(date.getDate() + 10);
      const newDate = new Date(foo);
      const dataPayu = {
        expirationDate: newDate.toISOString(),
        paymentMethod: values.method,
        sessionId: tokens.payu
      };
      const userDocumentNumber = values.document;
      urlPayment = await payuPay({ userDocumentNumber, data: dataPayu });
    }
    if (cart.idPsp === PSP.CONEKTA) {
      const tokenCard = "";
      urlPayment = await conektaPay(tokenCard);
    }
    if (cart.idPsp === PSP.BANWIRE) {
      urlPayment = await banwirePay();
    }
    if (cart.idPsp === PSP.DLOCAL) {
      urlPayment = await dlocalPay(values.document);
    }
    if (cart.idPsp === PSP.FOREST) {
      await forestPay({
        address: values.address,
        cardNum: values.cardNumber,
        city: values.city,
        cvv: values.ccv,
        expMont: values.expMonth,
        expYear: values.expYear,
        zip: values.postalCode
      });
    }
    if (cart.idPsp === PSP.TODITOPAY) {
      urlPayment = await toditopayPay();
    }
    if (cart.idPsp === PSP.OPENPAY) {
      urlPayment = await openpayPay({
        cardNumber: values.cardNumber,
        name: values.name,
        expYear: values.expYear,
        expMonth: values.expMonth,
        ccv: values.ccv
      }, handleClear, actions.setSubmitting);
    }
    if (cart.idPsp === PSP.FLOW || cart.idPsp === PSP.FLOWMX) {
      urlPayment = await flowPay();
    }

    if (cart.method !== Method.CARD && !!urlPayment) {
      openLink(urlPayment, cart.idPsp !== PSP.TODITOPAY);
    }
    if (cart.idPsp !== PSP.OPENPAY || cart.method !== Method.CARD) {
      handleClear();
    }
  }, t, initialValues);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(propsFormik) => (
        <>
          {propsFormik.isSubmitting ? <LoaderPage /> : null}
          <PaymentForm
            pspActive={pspActive}
            configuration={configuration}
            {...propsFormik}
          />
        </>
      )}
    </Formik>
  );
}
