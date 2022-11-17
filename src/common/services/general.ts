/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback } from "react";
import endpoints from "@endpoints";
import { showError } from "@utils";
import { Http, useServiceContext } from "@context";

import type { TFunction } from "react-i18next";
import type { FormikHelpers } from "formik";
import type { Submit } from "@typing/services";

export default function submitForm<T>(action: Submit<T>, t: TFunction, DEFAULT_VALUES: T) {
  return async (values: T, actions: FormikHelpers<T>) => {
    try {
      actions.setSubmitting(true);

      await action(values, actions);

      actions.resetForm({ values: DEFAULT_VALUES });
    } catch (error) {
      showError(error, t);
    } finally {
      actions.setSubmitting(false);
    }
  };
}

export const loaderApi = () => {
  const token = localStorage.getItem("sessionId") ?? "";
  return Http.create(token);
};

export const usePay = () => {
  const { api } = useServiceContext();

  async function payFunc<T, R>(body: T) {
    const { payload } = await api!.post<T, R>({
      endpoint: endpoints.payment,
      body,
      secure: false,
      local: true
    });

    return payload;
  }
  const pay = useCallback(payFunc, [api]);

  const openLink = (url: string, blank?: boolean) => {
    const link = document.createElement("a");
    link.href = url;
    if (blank) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.click();
    link.remove();
  };

  return { pay, openLink };
};
