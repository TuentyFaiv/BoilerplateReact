import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import swal from "sweetalert";
import { SignupSchema, DEFAULT_SIGNUP_VALUES } from "@schemas";
import { submitForm, useAuthService } from "@services";
import { useAppContext } from "@context";
import { useGetCountry } from "@hooks";
import { Actions } from "@typing/enums";

import type { SignupValues } from "@typing/services";

import { Input, Checkbox, LoaderPage, ModalTerms, ButtonGo } from "@components";

export default function RegisterForm() {
  const { t } = useTranslation("formik", { useSuspense: false });
  const { dispatch } = useAppContext();
  const { country } = useGetCountry();
  const { signin, signup } = useAuthService();

  const formTranslations = {
    required: t("required"),
    requiredTerms: t("required-terms"),
    email: t("required-email")
  };

  const initialValues = useMemo(() => ({
    ...DEFAULT_SIGNUP_VALUES,
    phoneCode: `${country.emoji} ${country.phoneCode}`,
    country: country.name
  }), [country]);

  const handleSubmit = submitForm<SignupValues>(async (values) => {
    const { terms, ...val } = values;
    const formValues = {
      ...val,
      country: country.code,
      phoneCode: values.phoneCode.replace(country.emoji, "").trim()
    };

    await signup(formValues);

    const user = await signin({ email: formValues.email, password: formValues.password });

    swal({
      title: t("signup-success", { ns: "swal" }),
      icon: "success"
    }).then(() => {
      dispatch({ type: Actions.SIGNIN, payload: { ...user, onboarding: null } });
    });
  }, t, initialValues);

  return (
    <>
      <h1 className="auth__title">{t("signup-title")}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema(formTranslations)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="auth__form">
            {isSubmitting ? <LoaderPage /> : null}
            <div className="auth__form-grid">
              <Input
                label={t("firstName")}
                name="firstName"
                type="text"
                placeholder={t("firstName")}
              />
              <Input
                label={t("lastName")}
                name="lastName"
                type="text"
                placeholder={t("lastName")}
              />
              <Input
                label={t("country")}
                name="country"
                type="text"
                placeholder={t("country")}
                readOnly
              />
              <Input
                label={t("email")}
                name="email"
                type="email"
                placeholder={t("email")}
              />
              <div className="auth__form-row">
                <Input
                  label={t("phoneCode")}
                  name="phoneCode"
                  type="text"
                  placeholder={t("phoneCode")}
                  readOnly
                />
                <Input
                  label={t("phoneNumber")}
                  name="phoneNumber"
                  type="text"
                  placeholder={t("phoneNumber")}
                />
              </div>
              <span />
              <Input
                label={t("password")}
                name="password"
                type="password"
                placeholder={t("password")}
              />
              <Input
                label={t("passwordConfirm")}
                name="confirmPassword"
                type="password"
                placeholder={t("passwordConfirm")}
              />
            </div>
            <div className="auth__form-terms">
              <Checkbox
                checked={values.terms}
                name="terms"
                label={t("terms-legend")}
              >
                <ModalTerms
                  redirect="/signup"
                  onClose={() => {
                    setFieldValue("terms", true);
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="auth__form-terms-button"
                      onClick={() => { open("terms"); }}
                    >
                      {t("terms-legend2")}
                    </button>
                  )}
                </ModalTerms>
              </Checkbox>
            </div>
            <ButtonGo
              type="submit"
              text={t("signup-submit")}
              size="big"
              disabled={isSubmitting}
              margin="center"
            />
          </Form>
        )}
      </Formik>
      <p className="auth__alredy">
        {t("signup-alredy")}
        <Link to="/signin" className="auth__alredy-link">
          {t("signup-alredy-link")}
        </Link>
      </p>
    </>
  );
}
