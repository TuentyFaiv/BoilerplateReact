import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { SigninSchema, DEFAULT_SIGNIN_VALUES } from "@schemas";
import { submitForm, useAuthService } from "@services";
import { useAppContext } from "@context";
import { Actions } from "@typing/enums";

import type { BodySignin } from "@typing/services";

import { ButtonGo, Input, LoaderPage } from "@components";

export default function SigninForm() {
  const { t } = useTranslation("formik", { useSuspense: false });
  const { dispatch } = useAppContext();
  const { signin } = useAuthService();

  const formTranslations = {
    required: t("required")
  };

  const handleSubmit = submitForm<BodySignin>(async (values) => {
    const user = await signin(values);

    dispatch({ type: Actions.SIGNIN, payload: { ...user, onboarding: null } });
  }, t, DEFAULT_SIGNIN_VALUES);

  return (
    <>
      <h1 className="auth__title">{t("signin-title")}</h1>
      <Formik
        initialValues={DEFAULT_SIGNIN_VALUES}
        validationSchema={SigninSchema(formTranslations)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="auth__form">
            {isSubmitting ? <LoaderPage /> : null}
            <Input
              label={t("tp")}
              name="email"
              type="text"
              placeholder={t("tp")}
            />
            <Input
              label={t("password")}
              name="password"
              type="password"
              placeholder={t("password")}
            />
            {/* <Link to="/forgot" className="auth__forgot">
              {t("signin-forgot")}
            </Link> */}
            <ButtonGo
              type="submit"
              text={t("signin-submit")}
              disabled={isSubmitting}
              size="big"
              margin="center"
            />
          </Form>
        )}
      </Formik>
      <p className="auth__alredy">
        {t("signin-notready")}
        <Link to="/signup" className="auth__alredy-link">
          {t("signin-notready-link")}
        </Link>
      </p>
    </>
  );
}
