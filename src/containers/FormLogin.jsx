import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import swal from "sweetalert";
import { SigninSchema, DEFAULT_SIGNIN_VALUES } from "@schemas";
// import config from "@config"; // Config to get API url
import { useAppContext } from "@context";

import Input from "@components/Input";

export default function FormLogin() {
  const { t } = useTranslation("formik", { useSuspense: false });
  const { dispatch } = useAppContext();

  const formTranslations = {
    required: t("required")
  };

  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);

      // Here should put the fetch() with await

      actions.setSubmitting(false);
      actions.resetForm({ values: DEFAULT_SIGNIN_VALUES });

      dispatch({ type: "SIGNIN" }); // Add payload property to signin
    } catch (error) {
      actions.setSubmitting(false);
      swal("Error!", t(error.message, { ns: "errors" }) || error.message, "error");
    }
  };

  return (
    <Formik
      initialValues={DEFAULT_SIGNIN_VALUES}
      validationSchema={SigninSchema(formTranslations)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
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
            disabled={(isSubmitting)}
          >
            {t("signin-submit")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
