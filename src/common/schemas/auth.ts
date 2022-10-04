import { object, string, boolean } from "yup";

import type {
  Boot,
  BootAuthSignup
} from "@typing/types";
import type {
  BodyForgot,
  BodyReset,
  BodySignin,
  BodySignup
} from "@typing/services";

export const ForgotSchema = (boot: Boot) => object().shape({
  email: string().required(boot.required)
});

export const DEFAULT_FORGOT_VALUES: BodyForgot = {
  email: ""
};

export const SigninSchema = (boot: Boot) => object().shape({
  email: string().required(boot.required),
  password: string().required(boot.required)
});

export const DEFAULT_SIGNIN_VALUES: BodySignin = {
  email: "",
  password: ""
};

export const ResetSchema = (boot: Boot) => object().shape({
  password: string().required(boot.required),
  confirmPassword: string().required(boot.required)
});

export const DEFAULT_RESET_VALUES: BodyReset = {
  password: "",
  confirmPassword: ""
};

export const SignupSchema = (boot: BootAuthSignup) => object().shape({
  firstName: string().required(boot.required),
  lastName: string().required(boot.required),
  country: string().required(boot.required),
  email: string().email(boot.email).required(boot.required),
  phoneNumber: string().required(boot.required),
  phoneCode: string().required(boot.required),
  password: string().required(boot.required),
  confirmPassword: string().required(boot.required),
  terms: boolean().oneOf([true], boot.requiredTerms)
});

export const DEFAULT_SIGNUP_VALUES: BodySignup = {
  firstName: "",
  lastName: "",
  country: "",
  email: "",
  phoneNumber: "",
  phoneCode: "",
  password: "",
  confirmPassword: "",
  terms: false
};
