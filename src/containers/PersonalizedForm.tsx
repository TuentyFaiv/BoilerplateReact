import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { PersonalizedSchema, DEFAULT_PERSONALIZED_VALUES } from "@schemas";
import { submitForm } from "@services";
import { useAppContext, useCartContext } from "@context";
import { useAuthentication } from "@hooks";
import { Actions } from "@typing/enums";

import type { PersonalizedFormProps } from "@typing/proptypes";
import type { BodyPersonalized } from "@typing/services";

import { ButtonBack, ButtonGo, Input, LoaderPage } from "@components";
import { withAuth } from "@hoc";

function PersonalizedForm({ onBack, auth }: PersonalizedFormProps) {
  const { t } = useTranslation("formik", { useSuspense: false });
  const { global: { user } } = useAppContext();
  const { dispatch } = useCartContext();
  const { redirect } = useAuthentication(auth);

  const formTranslations = {
    required: t("required")
  };

  const handleSubmit = submitForm<BodyPersonalized>(async (values) => {
    const payload = {
      amount: parseInt(values.amount, 10),
      description: "PERSONALIZED"
    };
    if (!payload.amount) throw new Error("introduce un monto");

    dispatch({ type: Actions.ADD_TO_CART, payload });
    redirect(`/payment/${user.tpId}`);
  }, t, DEFAULT_PERSONALIZED_VALUES);

  return (
    <Formik
      initialValues={DEFAULT_PERSONALIZED_VALUES}
      validationSchema={PersonalizedSchema(formTranslations)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="personalized__form">
          {isSubmitting ? <LoaderPage /> : null}
          <h2 className="personalized__title">
            {t("personalized-amount", { ns: "translation" })}
          </h2>
          <Input
            label={t("amount")}
            name="amount"
            type="number"
            min={1}
            placeholder={t("amount")}
          />
          <span className="personalized__flex">
            <ButtonBack onClick={onBack} />
            <ButtonGo
              text={t("button-buy", { ns: "translation" })}
              type="submit"
              margin="zero"
            />
          </span>
        </Form>
      )}
    </Formik>
  );
}

export default withAuth(PersonalizedForm, "component");
