import { object, boolean, string } from "yup";

import type { ConactValues } from "@typing/services";
import type { BootContact } from "@typing/types";

export const ContactSchema = (boot: BootContact) => object().shape({
  name: string().required(boot.required),
  phone: string().required(boot.required),
  email: string().email().required(boot.required),
  message: string().max(200),
  terms: boolean().oneOf([true], boot.requiredTerms)
});

export const DEFAULT_CONTACT_VALUES: ConactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  terms: false
};
