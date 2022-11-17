/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useAppContext, useCartContext } from "@context";
import { usePay, usePaymentExternalService } from "@services";
import { Method } from "@typing/enums";

import type{ FormikHelpers } from "formik";
import type {
  BodyDLocalGeneral,
  BodyForestCard,
  BodyPaymentCard,
  BodyPaymentGeneral,
  PaymentValues,
  BodyBanwire,
  BodyConekta,
  BodyPayu,
  BodyPayuParams
} from "@typing/services";
import type { OpenpayTokenConfig } from "@typing/payment";

const usePaymentService = () => {
  const { global: { user } } = useAppContext();
  const { cart } = useCartContext();
  const { pay, openLink } = usePay();
  const { openpayCard } = usePaymentExternalService();

  const bodyGeneral: BodyPaymentGeneral = {
    psp: cart.idPsp,
    action: cart.method,
    amount: cart.exchangeAmount,
    original_amount: cart.amount,
    currency: cart.exchangeCurrency,
    tp_id: user.tpId
  };

  const payuPay = async (BodyPayuParams: BodyPayuParams) => {
    const bodyPayu : BodyPayu = {
      ...bodyGeneral,
      ...BodyPayuParams,
      description: cart.description,
      action: Method.CASH
    };
    return pay<BodyPayu, string>(bodyPayu);
  };

  const banwirePay = async () => {
    const bodyBanwire : BodyBanwire = {
      ...bodyGeneral,
      description: cart.description
    };
    return pay<BodyBanwire, string>(bodyBanwire);
  };

  const conektaPay = async (token: string) => {
    const bodyConekta : BodyConekta = {
      ...bodyGeneral,
      description: cart.description,
      tokenCard: token
    };
    return pay<BodyConekta, string>(bodyConekta);
  };

  const dlocalPay = async (document: string) => {
    const bodyDLocal: BodyDLocalGeneral = {
      ...bodyGeneral,
      document
    };

    return pay<BodyDLocalGeneral, string>(bodyDLocal);
  };

  const forestPay = async (values: Omit<BodyForestCard, keyof BodyPaymentGeneral>) => {
    const bodyForest: BodyForestCard = {
      ...bodyGeneral,
      ...values
    };

    return pay<BodyForestCard, string>(bodyForest);
  };

  const toditopayPay = async () => (pay<BodyPaymentGeneral, string>(bodyGeneral));

  const openpayPay = async (
    values: BodyPaymentCard,
    onSuccess: VoidFunction,
    loading: FormikHelpers<PaymentValues>["setSubmitting"]
  ) => {
    const tokenConfig: OpenpayTokenConfig = {
      card_number: values.cardNumber,
      holder_name: values.name,
      expiration_year: values.expYear.slice(2),
      expiration_month: values.expMonth,
      cvv2: values.ccv
    };
    if (cart.method !== Method.CARD) {
      return pay<BodyPaymentGeneral, string>(bodyGeneral);
    }
    openpayCard({ tokenConfig, body: bodyGeneral, onSuccess, loading });
    return "";
  };

  const flowPay = async () => (pay<BodyPaymentGeneral, string>(bodyGeneral));

  return {
    dlocalPay,
    forestPay,
    toditopayPay,
    openpayPay,
    flowPay,
    openLink,
    banwirePay,
    conektaPay,
    payuPay
  };
};

export default usePaymentService;
