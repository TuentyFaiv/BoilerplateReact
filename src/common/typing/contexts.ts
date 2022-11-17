import type { Dispatch, ReactNode } from "react";
import type { Http } from "@context";
import type {
  ActiveDLocalAction,
  ActiveOpenPayAction,
  AddToCartAction,
  ChangeOnboardingAction,
  ClearCartAction,
  DeactiveDLocalAction,
  DeactiveOpenPayAction,
  ExchangeCartAction,
  SetMethodCartAction,
  SetPspCartAction,
  SigninAction,
  SignoutAction,
  UpdateProfileImageAction,
  UpdateUserAction
} from "./actions";
import type { ReturnSignin } from "./services";
import type {
  DocumentFields,
  Methods,
  ObjCountry,
  DLocal,
  Openpay
} from "./payment";

import {
  HTTPMetod,
  HTTPContentType,
  Onboarding,
  PSP,
  Method,
  Currencies,
  OpenpayErrors
} from "./enums";

export type ContextAppUser = Omit<ReturnSignin, "sessionId" | "profileImage"> & {
  profileImage: string;
};

export type ContextAppState = {
  sessionId: string | null;
  user: ContextAppUser;
  onboarding: null | Onboarding;
  openPay: null | Openpay;
  dlocal: null | DLocal;
};

export type ContextAppReducerAction = SigninAction
| SignoutAction
| ChangeOnboardingAction
| UpdateUserAction
| UpdateProfileImageAction
| ActiveOpenPayAction
| DeactiveOpenPayAction
| ActiveDLocalAction
| DeactiveDLocalAction;

export type ContextApp = {
  global: ContextAppState;
  dispatch: Dispatch<ContextAppReducerAction>;
};

export type ContextAppProvider = {
  children: ReactNode;
};

export type ContextService = {
  api: Http | null;
};

export type ContextServiceProvider = {
  children: ReactNode;
};

export type HTTPRequestConfig = {
  signal?: AbortSignal | undefined;
  body?: string | FormData | undefined;
  method: HTTPMetod;
  headers: {
    Authorization?: string | undefined;
    "Content-Type"?: HTTPContentType | undefined;
  }
};

export type HTTPLog = {
  url?: string;
  request?: HTTPRequestConfig;
  response?: unknown;
};

export type HTTPConfigConnection<T> = {
  method: HTTPMetod;
  secure: boolean;
  endpoint: string;
  query: string;
  body?: T;
  contentType?: HTTPContentType;
  errorMessage?: string;
  signal?: AbortSignal;
  lang?: string;
  local?: boolean;
  punkaso?: boolean;
  log?: boolean;
};

type HTTPConfigOptionalMethods = {
  query?: string;
  secure?: boolean;
};

export type HTTPConfigGet = Omit<HTTPConfigConnection<unknown>, "method" | "body" | "query" | "secure">
& HTTPConfigOptionalMethods;
export type HTTPConfigMethods<T> = Omit<HTTPConfigConnection<T>, "method" | "query" | "secure">
& HTTPConfigOptionalMethods;

export type HTTPConnectionReturn<T> = {
  success: boolean;
  message: string;
  payload: T;
};

export type HttpConnectionError = {
  status: string;
  message: string;
  errors: {
    description?: string;
  };
  code: number;
};

export type HTTPBodyFiles<T> = {
  files?: File[];
  file: File;
} & T & Record<string, never>;

export type ContextCartState = {
  amount: number;
  currency: Currencies;
  description: string;
  idPsp: PSP;
  namePsp: string;
  method: Method;
  country: ContextCountryCart;
  exchangeAmount: number;
  exchangeCurrency: Currencies;
};

export type ContextCartError = {
  code: null | number;
  psp_code: null | number | OpenpayErrors;
  psp_name: null | PSP;
  message: null | string;
};

export type ContextCountryCart = keyof ObjCountry<Currencies[] | DocumentFields | Methods>;

export type ContextCartReducerAction = AddToCartAction
| SetPspCartAction
| ExchangeCartAction
| SetMethodCartAction
| ClearCartAction;

export type ContextCart = {
  cart: ContextCartState;
  error: ContextCartError;
  changeError: (error: ContextCartError, clean?: boolean) => void;
  dispatch: Dispatch<ContextCartReducerAction>;
};

export type ContextCartProvider = {
  children: ReactNode;
};
