import type { FormikHelpers } from "formik";
import type {
  DocumentFields,
  Methods,
  ObjCountry,
  OpenpayTokenConfig
} from "./payment";
import type { BootPayment } from "./types";
import type { ContextCountryCart } from "./contexts";

import { Currencies, Method, PSP } from "./enums";

// Authentication
export type BodySignin = {
  email: string;
  password: string;
};
export type ReturnSignin = {
  country: string;
  crmId: string;
  email: string;
  firstName: string;
  lastName: string;
  sessionId: string;
  profileImage?: string | null;
  tpId: string;
};

export type BodyForgot = Omit<BodySignin, "password">;
export type ReturnForgot = any;

export type BodyReset = Omit<BodySignin, "email"> & {
  confirmPassword: string;
};

export type ReturnReset = any;

export type BodySignup = BodySignin & {
  firstName: string;
  lastName: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  confirmPassword: string;
};

export type SignupValues = BodySignup & {
  terms: boolean;
};

export type ReturnSignup = any;

// Contact
export type BodyContact = {
  name: string;
  phone: string;
  email: string;
  message: string;
  terms: boolean;
  phoneCode: string;
};
export type ConactValues = Omit<BodyContact, "phoneCode">;

// Exchange
export type BodyExchange = {
  amount: number;
  currency: string;
};
export type ReturnExchange = {
  amount: string;
  currency: string;
};

// Payment
export type BodyPersonalized = {
  amount: `${number}`;
};

export type BodyAntifraudPayU = {
  action: "device";
  data: {
    sessionId: string;
  };
};

export type BodyPaymentGeneral = {
  psp: PSP;
  action: Method;
  amount: number;
  original_amount: number;
  currency: Currencies;
  tp_id: string;
};

export type BodyPaymentCard = {
  cardNumber: string;
  name: string;
  expMonth: string;
  expYear: string;
  ccv: string;
};

export type BodyDLocalGeneral = BodyPaymentGeneral & {
  document: string;
};

export type BodyConekta = BodyPaymentGeneral & {
  description: string;
  tokenCard: string;
};

type BodyDataPayu = {
  expirationDate: string;
  paymentMethod: string;
  sessionId: string;
};

export type BodyPayuParams = {
  userDocumentNumber: string,
  data: BodyDataPayu
};

export type BodyPayu = BodyPaymentGeneral & {
  description: string;
  userDocumentNumber: string;
  data: BodyDataPayu
};

export type BodyBanwire = BodyPaymentGeneral & {
  description: string;
};

export type BodyDLocalCard = BodyDLocalGeneral & {
  psp: PSP;
  session: string;
  cardholder: string;
  token: string;
};

export type BodyForestCard = BodyPaymentGeneral & {
  address: string;
  city: string;
  zip: string;
  cardNum: string;
  cvv: string;
  expMont: string;
  expYear: string;
};

export type BodyOpenpayCard = BodyPaymentGeneral & {
  card: string;
  token_card: string;
  device_session_id: string;
};

export type ReturnConfigPsps = {
  id: number; // Same that pspId
  pspId: PSP;
  name: string;
  countries?: string[];
  currency: ObjCountry<Currencies[]>;
  method: ObjCountry<Methods>;
  available: boolean;
  maxAmount: number;
  minAmount: number;
  selectedCountries: string[];
  availableCountries: string[];
  availableBusinessUnits: number[];
  notAvailableBusinessUnit: number[];
  document?: ObjCountry<DocumentFields>;
  // cards?: Cards;
  // efectivo?: Efectivo;
  label?: string;
  avalailable?: boolean;
};

export type BodyConfirmOpenpay = {
  id: string;
  method: "confirm";
  site: "TRADERBOTIC";
  country: ContextCountryCart;
};

export type OpenpayCardParam = {
  tokenConfig: OpenpayTokenConfig;
  body: BodyPaymentGeneral;
  onSuccess: VoidFunction;
  loading: (isSubmitting: boolean) => void;
};

export type PaymentSchemaConfig = {
  boot: BootPayment;
  psp: PSP;
  method: Method;
};

export type PaymentValues = {
  psp: string;
  // amount: string;
  currency: string;
  method: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  ccv: string;
  address: string;
  city: string;
  postalCode: string;
  document: string;
  name: string;
  terms: boolean;
};

// SubmitForm
export type Submit<T> = (values: T, actions: FormikHelpers<T>) => void;
