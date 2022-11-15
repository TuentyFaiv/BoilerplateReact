import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { SigninSchema, DEFAULT_SIGNIN_VALUES } from "@schemas";
import { submitForm } from "@services";
// import { useAuthService } from "@services"; // Service Auth
// import { useAppContext } from "@context";
// import { Actions } from "@typing/enums";

import type { BodySignin } from "@typing/services";
import type { Boot } from "@typing/types";

import { Input } from "@components";

export default function SigninForm() {
  const { t } = useTranslation("formik");
  // const { dispatch } = useAppContext();
  // const { signin } = useAuthService();

  const boot: Boot = {
    required: t("required")
  };

  const handleSubmit = submitForm<BodySignin>(async () => {
    // Here should put the signin() with await

    // actions.resetForm({ values: DEFAULT_SIGNIN_VALUES });

    // dispatch({ type: Actions.SIGNIN }); // Add payload property to signin
  }, DEFAULT_SIGNIN_VALUES);

  return (
    <Formik
      initialValues={DEFAULT_SIGNIN_VALUES}
      validationSchema={SigninSchema(boot)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="auth__form">
          <Input
            label={t("email")}
            name="email"
            type="text"
            placeholder={t("email") ?? ""}
          />
          <Input
            label={t("password")}
            name="password"
            type="password"
            placeholder={t("password") ?? ""}
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
