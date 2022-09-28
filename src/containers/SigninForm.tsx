import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";
import swal from "sweetalert";
import { SigninSchema, DEFAULT_SIGNIN_VALUES } from "@schemas";
// import { useAuthService } from "@services"; // Service Auth
// import { useAppContext } from "@context";

import type { BodySignin } from "@typing/services";

import { Input } from "@components";

export default function SigninForm() {
  const { t } = useTranslation("formik");
  // const { dispatch } = useAppContext();
  // const { signin } = useAuthService();

  const formTranslations = {
    required: t("required")
  };

  const handleSubmit = async (values: BodySignin, actions: FormikHelpers<BodySignin>) => {
    try {
      actions.setSubmitting(true);

      // Here should put the signin() with await

      // actions.resetForm({ values: DEFAULT_SIGNIN_VALUES });

      // dispatch({ type: "SIGNIN" }); // Add payload property to signin
    } catch (error) {
      let message = "¡Oh no!";
      if (error instanceof Error) message = error.message;

      swal("Error!", t(message, { ns: "errors" }) || message, "error");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={DEFAULT_SIGNIN_VALUES}
      validationSchema={SigninSchema(formTranslations)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="auth__form">
          <Input
            label={t("email")}
            name="email"
            type="text"
            placeholder={t("email")}
          />
          <Input
            label={t("password")}
            name="password"
            type="password"
            placeholder={t("password")}
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
