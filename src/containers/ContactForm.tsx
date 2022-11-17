import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import { ContactSchema, DEFAULT_CONTACT_VALUES } from "@schemas";
import { submitForm, useContactService } from "@services";
import { useGetCountry } from "@hooks";

import type { ContactFormProps } from "@typing/proptypes";
import type { ConactValues } from "@typing/services";
import type { BootContact } from "@typing/types";

import { Input, TextArea, Checkbox, ModalTerms, LoaderPage, ButtonGo } from "@components";

export default function ContactForm({ children }: ContactFormProps) {
  const { t } = useTranslation("formik", { useSuspense: false });
  const { country: { phoneCode } } = useGetCountry();
  const { sendEmail } = useContactService();

  const formTranslations: BootContact = {
    required: t("required"),
    requiredTerms: t("required-terms"),
    email: t("required-email")
  };

  const handleSubmit = submitForm<ConactValues>(async (values) => {
    await sendEmail({ ...values, phoneCode });

    swal({
      title: "Success!",
      text: t("contact-form-success", { ns: "swal" }),
      icon: "success"
    });
  }, t, DEFAULT_CONTACT_VALUES);

  return (
    <section className="contact">
      <div className="contact__content">
        <h2 className="contact__title">
          {t("contact-title", { ns: "translation" })}
        </h2>
        <p className="contact__subtitle contact__subtitle--nomargin">
          {t("contact-subtitle", { ns: "translation" })}
        </p>
        {children}
      </div>
      <Formik
        initialValues={DEFAULT_CONTACT_VALUES}
        validationSchema={ContactSchema(formTranslations)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="contact__form" id="contact">
            {isSubmitting ? <LoaderPage /> : null}
            <div className="contact__content">
              <h2 className="contact__title">
                {t("contact-form-title", { ns: "translation" })}
              </h2>
              <p className="contact__subtitle">
                {t("contact-form-subtitle", { ns: "translation" })}
              </p>
              <div className="contact__form-grid">
                <Input
                  label={t("name")}
                  name="name"
                  type="text"
                  placeholder={t("name")}
                />
                <Input
                  label={t("phone")}
                  name="phone"
                  type="text"
                  placeholder={t("phone")}
                />
                <Input
                  label={t("email")}
                  name="email"
                  type="email"
                  placeholder={t("email")}
                />
                <TextArea
                  label={t("details")}
                  name="message"
                  placeholder={t("details")}
                  rows={5}
                />
              </div>
              <Checkbox
                checked={values.terms}
                name="terms"
                label={t("terms-contact-legend")}
                label2={t("terms-contact-legend3")}
              >
                <ModalTerms
                  onClose={() => {
                    setFieldValue("terms", true);
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="contact__form-terms-button"
                      onClick={() => open("both")}
                    >
                      {t("terms-contact-legend2")}
                    </button>
                  )}
                </ModalTerms>
              </Checkbox>
              <ButtonGo
                type="submit"
                text={t("contact-submit")}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
