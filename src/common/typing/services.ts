import type { FormikHelpers } from "formik";

// Authentication
export type BodySignin = {
  email: string;
  password: string;
};
export type ReturnSignin = {
  token: string;
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
  terms: boolean;
};

export type ReturnSignup = any;

// Contact
export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  message: string;
  subject: string;
  terms: boolean;
}

// SubmitForm
export type Submit<T> = (values: T, actions: FormikHelpers<T>) => void;
