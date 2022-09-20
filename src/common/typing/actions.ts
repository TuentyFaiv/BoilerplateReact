import { Actions, Onboarding } from "./enums";

export type SigninAction = {
  type: Actions.SIGNIN;
  payload: any;
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
