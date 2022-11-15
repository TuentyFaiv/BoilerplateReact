import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { SignupSchema, DEFAULT_SIGNUP_VALUES } from "@schemas";
import { submitForm } from "@services";
// import { useAuthService } from "@services"; // Service Auth
// import { useAppContext } from "@context";
// import { Actions } from "@typing/enums";

import type { BodySignup } from "@typing/services";
import type { BootAuthSignup } from "@typing/types";

import { Checkbox, Input, Select } from "@components";

export default function SigninForm() {
  const { t } = useTranslation("formik");
  // const { dispatch } = useAppContext();
  // const { signup, singin } = useAuthService();

  const boot: BootAuthSignup = {
    required: t("required"),
    requiredTerms: t("required-terms"),
    email: t("required-email")
  };

  const handleSubmit = submitForm<BodySignup>(async () => {
    // Here should put the signup() with await
    // Here should put the signin() with await

    // actions.resetForm({ values: DEFAULT_SIGNUP_VALUES });

    // dispatch({ type: Actions.SIGNIN }); // Add payload property to signin after signup
  }, DEFAULT_SIGNUP_VALUES);

  return (
    <Formik
      initialValues={DEFAULT_SIGNUP_VALUES}
      validationSchema={SignupSchema(boot)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="auth__form">
          <Input
            label={t("first-name")}
            name="firstName"
            type="text"
            placeholder={t("first-name") ?? ""}
          />
          <Input
            label={t("last-name")}
            name="lastName"
            type="text"
            placeholder={t("last-name") ?? ""}
          />
          <Input
            label={t("country")}
            name="country"
            type="text"
            placeholder={t("country") ?? ""}
          />
          <Input
            label={t("email")}
            name="email"
            type="email"
            placeholder={t("email") ?? ""}
          />
          <Select
            label={t("phone-code")}
            name="phoneCode"
            options={[]}
          />
          <Input
            label={t("phone-number")}
            name="phoneNumber"
            type="tel"
            placeholder={t("phone-number") ?? ""}
          />
          <Input
            label={t("password")}
            name="password"
            type="password"
            placeholder={t("password") ?? ""}
          />
          <Input
            label={t("confirm-password")}
            name="confirmPassword"
            type="password"
            placeholder={t("confirm-password") ?? ""}
          />
          <Checkbox
            label={t("terms") ?? ""}
            name="terms"
            checked={values.terms}
          />
          <button
            type="submit"
            className="auth__form-submit"
            disabled={(isSubmitting)}
          >
            {t("signin-submit")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
