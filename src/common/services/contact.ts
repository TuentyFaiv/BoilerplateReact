/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback } from "react";
import endpoints from "@endpoints";
import { useServiceContext } from "@context";

import type { BodyContact } from "@typing/services";

const useContactService = () => {
  const { api } = useServiceContext();

  const sendEmail = useCallback(async (values: BodyContact) => {
    const { payload } = await api!.post<BodyContact, unknown>({
      endpoint: endpoints.contact,
      body: values,
      local: true,
      secure: false
    });
    return payload;
  }, [api]);

  return {
    sendEmail
  };
};

export default useContactService;
