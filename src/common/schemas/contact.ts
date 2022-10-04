import { object, string, boolean } from "yup";

import type { BootContact } from "@typing/types";
import type { ContactValues } from "@typing/services";

export const ContactSchema = (boot: BootContact) => object().shape({
  name: string().required(boot.required),
  phone: string().matches(/[0-9]/, boot.onlyNumbers).required(boot.required),
  email: string().email(boot.email).required(boot.required),
  message: string().max(200),
  subject: string().max(80),
  terms: boolean().oneOf([true], boot.requiredTerms)
});

export const DEFAULT_CONTACT_VALUES: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  subject: "",
  terms: false
};
