import type { ContextAppState } from "./contexts";
import type { ReturnSignin } from "./services";
import type { DLocal, Openpay } from "./payment";

import { Actions, Currencies, Method, Onboarding, PSP } from "./enums";

export type SigninAction = {
  type: Actions.SIGNIN;
  payload: ReturnSignin & Pick<ContextAppState, "onboarding">;
};

export type SignoutAction = {
  type: Actions.SIGNOUT;
  payload?: null;
};

export type UpdateUserAction = {
  type: Actions.UPDATE_USER;
  payload: any;
};

export type UpdateProfileImageAction = {
  type: Actions.UPDATE_PROFILE_IMAGE;
  payload: string;
};

export type ChangeOnboardingAction = {
  type: Actions.CHANGE_ONBOARDING;
  payload: Onboarding;
};

export type ActiveOpenPayAction = {
  type: Actions.ACTIVE_OPENPAY;
  payload: Openpay;
};

export type DeactiveOpenPayAction = {
  type: Actions.DEACTIVE_OPENPAY;
};
export type ActiveDLocalAction = {
  type: Actions.ACTIVE_DLOCAL;
  payload: DLocal;
};

export type DeactiveDLocalAction = {
  type: Actions.DEACTIVE_DLOCAL;
};

export type AddToCartAction = {
  type: Actions.ADD_TO_CART,
  payload: {
    amount: number;
    description: string;
  }
};

export type ExchangeCartAction = {
  type: Actions.EXCHANGE_CART,
  payload: {
    exchangeAmount: number;
    exchangeCurrency: Currencies;
  };
};

export type SetPspCartAction = {
  type: Actions.SET_PSP,
  payload: PSP;
};

export type SetMethodCartAction = {
  type: Actions.SET_PAYMENT_METHOD,
  payload: Method;
};

export type ClearCartAction = {
  type: Actions.CLEAR_CART
};
