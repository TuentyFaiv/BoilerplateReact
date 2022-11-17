import { object, string, boolean } from "yup";
import { Method, PSP } from "@typing/enums";

import type {
  BodyPersonalized,
  PaymentSchemaConfig,
  PaymentValues
} from "@typing/services";
import type { Boot } from "@typing/types";

export const PersonalizedSchema = (boot: Boot) => object().shape({
  amount: string().matches(/[0-9]/).required(boot.required)
});

export const DEFAULT_PERSONALIZED_VALUES: BodyPersonalized = {
  amount: "0"
};

const methods = [Method.CARD, Method.CASH];
const methodsDlocal = [Method.CARD, Method.OXXODLOCAL, Method.SPEIDLOCAL];
const methodsForest = [Method.CARD];
const methodsConekta = [Method.SPEIBANWIRE, Method.CASH, Method.CARD];
const methodsToditopay = [Method.CARDTODITOPAY];
const methodsBanwire = [Method.SPEIBANWIRE, Method.OXXOBANWIRE, Method.PAYCASHBANWIRE];
const methodsOpenpay = [Method.CARD, Method.SPEIOPENPAY, Method.CASHOPENPAY];
const methodsPayu = [Method.CARD, Method.CASH, Method.SPEIPAYU, Method.BANKPAYU];
const methodsFlow = [
  Method.WEBPAYFLOW,
  Method.SERVIPAGFLOW,
  Method.MULTICAJAFLOW,
  Method.CARDFLOW,
  Method.MACHFLOW,
  Method.SPEIFLOW,
  Method.KHIPUFLOW,
  Method.OXXOFLOW,
  Method.PAYNETFLOW,
  Method.CASHFLOW
];

const regexNumbers = /[0-9]/;

export const PaymentSchema = ({ boot, psp, method }: PaymentSchemaConfig) => {

  const generalSchema = {
    psp: string().matches(regexNumbers, boot.numbers),
    currency: string().required(boot.required),
    method: string().oneOf(methods).required(boot.required)
  };

  const cardSchema = {
    cardNumber: string().matches(regexNumbers, boot.numbers).max(16).required(boot.required),
    expMonth: string().matches(regexNumbers, boot.numbers).required(boot.required),
    expYear: string().matches(regexNumbers, boot.numbers).required(boot.required),
    ccv: string().matches(regexNumbers, boot.numbers).required(boot.required)
  };
  if (psp === PSP.CONEKTA) {
    const conektaSchema = {
      method: string().oneOf(methodsConekta, `${boot.methods} Conekta`).required(boot.required)
    };
    return object().shape({ ...generalSchema, ...conektaSchema });
  }
  if (psp === PSP.PAYU) {
    const payuSchema = {
      document: string().required(boot.required),
      method: string().oneOf(methodsPayu, `${boot.methods} Payu`).required(boot.required)
    };
    return object().shape({ ...generalSchema, ...payuSchema });
  }

  if (psp === PSP.BANWIRE) {
    const banwireSchema = {
      terms: boolean().oneOf([true], boot.required),
      method: string().oneOf(methodsBanwire, `${boot.methods} Banwire`).required(boot.required)
    };

    return object().shape({ ...generalSchema, ...banwireSchema });
  }

  if (psp === PSP.DLOCAL) {
    const dlocalSchema = {
      document: string().required(boot.required),
      method: string().oneOf(methodsDlocal, `${boot.methods} DLocal`).required(boot.required)
    };

    if (method === Method.CARD) {
      const cardDlocalSchema = {
        name: string().required(boot.required)
      };
      return object().shape({
        ...generalSchema,
        ...dlocalSchema,
        ...cardDlocalSchema
      });
    }

    return object().shape({ ...generalSchema, ...dlocalSchema });
  }

  if (psp === PSP.FOREST) {
    const forestSchema = {
      address: string().required(boot.required),
      city: string().required(boot.required),
      postalCode: string().matches(regexNumbers, boot.numbers).required(boot.required),
      method: string().oneOf(methodsForest, `${boot.methods} Forest`).required(boot.required)
    };
    if (method === Method.CARD) {

      return object().shape({
        ...generalSchema,
        ...forestSchema,
        ...cardSchema
      });
    }

    return object().shape({ ...generalSchema, ...forestSchema });
  }

  if (psp === PSP.TODITOPAY) {
    const toditopaySchema = {
      method: string().oneOf(methodsToditopay, `${boot.methods} ToditoPay`).required(boot.required)
    };

    return object().shape({ ...generalSchema, ...toditopaySchema });
  }

  if (psp === PSP.OPENPAY) {
    const openpaySchema = {
      method: string().oneOf(methodsOpenpay, `${boot.methods} Openpay`).required(boot.required)
    };

    if (method === Method.CARD) {
      const cardOpenpaySchema = {
        name: string().required(boot.required),
        ...cardSchema
      };
      return object().shape({
        ...generalSchema,
        ...openpaySchema,
        ...cardOpenpaySchema
      });
    }

    return object().shape({ ...generalSchema, ...openpaySchema });
  }

  if (psp === PSP.FLOW || psp === PSP.FLOWMX) {
    const flowSchema = {
      method: string().oneOf(methodsFlow, `${boot.methods} Flow`).required(boot.required)
    };

    return object().shape({ ...generalSchema, ...flowSchema });
  }

  return object().shape(generalSchema);
};

export const DEFAULT_PAYMENT_VALUES: PaymentValues = {
  psp: "",
  currency: "",
  method: "",
  cardNumber: "",
  expMonth: "",
  expYear: "",
  ccv: "",
  address: "",
  city: "",
  postalCode: "",
  document: "",
  name: "",
  terms: false
  // firstName: "",
  // lastName: "",
  // email: "",
  // phone: "",
};
