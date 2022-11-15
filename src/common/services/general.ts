import { throwError } from "@utils";

import type { FormikHelpers } from "formik";
import type { Submit } from "@typing/services";

export default function submitForm<T>(action: Submit<T>, DEFAULT_VALUES: T, finish?: VoidFunction) {
  return async (values: T, actions: FormikHelpers<T>) => {
    try {
      actions.setSubmitting(true);

      await action(values, actions);

      actions.resetForm({ values: DEFAULT_VALUES });
    } catch (error) {
      throwError(error);
    } finally {
      actions.setSubmitting(false);
      finish?.();
    }
  };
}
