import type { SelectOption } from "./types";

import { Currencies, OpenpayErrors } from "./enums";

export type DocumentFields = {
  placeHolder: string;
  minLength: number;
  maxLength: number;
};

export type ObjCountry<T> = {
  MX?: T;
  BR?: T;
  CO?: T;
  AR?: T;
  CL?: T;
  PE?: T;
  PY?: T;
  CR?: T;
  EC?: T;
  PA?: T;
};

export type Methods = {
  [key in Currencies]?: SelectOption[];
};

export type OpenpayTokenConfig = {
  card_number: string;
  holder_name: string;
  expiration_year: string;
  expiration_month: string;
  cvv2: string;
};

export type OpenpaySuccessParam = {
  data: {
    card: string;
    id: string;
  }
};

export type OpenpayErrorParam = {
  data: {
    error_code: OpenpayErrors;
    http_code: number;
    description: string;
  }
};

type OpenpayTokenSuccess = (param: Promise<OpenpaySuccessParam>) => void;
type OpenpayTokenError = (param: Promise<OpenpayErrorParam>) => void;

export type Openpay = {
  setId: (id: string) => void;
  setApiKey: (apiKey: string) => void;
  setSandboxMode: (active: boolean) => void;
  deviceData: {
    setup: () => string;
  };
  token: {
    create: (config: OpenpayTokenConfig, success: OpenpayTokenSuccess, error: OpenpayTokenError) => void;
  };
};

type FieldDLocalConfig = {
  locale: string;
  country: string;
};

type DLocalStyles = {
  style: {
    base: {
      fontSize: string,
      color: string;
    }
  }
};

type DLocalMethod = {
  mount: (element: HTMLDivElement) => void;
  destroy: VoidFunction;
};

type DLocalTokenConfig = {
  name: string;
};

type DLocalFields = {
  create: (type: string, styles: DLocalStyles) => DLocalMethod;
};

type DLocalToken = {
  token: string;
};

export type DLocal = {
  fields: (config: FieldDLocalConfig) => DLocalFields;
  createToken: (method: DLocalMethod, config: DLocalTokenConfig) => Promise<DLocalToken>
};

export type PspsWindow = {
  OpenPay: Openpay;
  dlocal: (key: string) => DLocal;
};
