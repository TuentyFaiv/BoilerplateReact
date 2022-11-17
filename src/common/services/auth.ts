/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback } from "react";
import endpoints from "@endpoints";
import { useServiceContext } from "@context";

import type { BodySignin, BodySignup, ReturnSignin, ReturnSignup } from "@typing/services";

const useAuthService = () => {
  const { api } = useServiceContext();

  const signin = useCallback(async (values: BodySignin) => {
    const { payload } = await api!.get<ReturnSignin>({
      endpoint: endpoints.signin,
      query: `?email=${values.email}&password=${values.password}`,
      secure: false
    });

    return payload;
  }, [api]);

  const signup = useCallback(async (values: BodySignup) => {
    const { payload } = await api!.post<BodySignup, ReturnSignup>({
      endpoint: endpoints.signup,
      body: values,
      secure: false
    });

    return payload;
  }, [api]);

  return {
    signin,
    signup
  };
};

export default useAuthService;
