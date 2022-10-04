/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useServiceContext } from "@context";

import type {
  BodyForgot,
  BodySignin,
  BodySignup,
  ReturnForgot,
  ReturnSignin,
  ReturnSignup
} from "@typing/services";

const useAuthService = () => {
  const { api } = useServiceContext();

  const signin = async () => {
    const { payload } = await api!.post<BodySignin, ReturnSignin>({
      endpoint: ""
    });
    return payload;
  };

  const signup = async () => {
    const { payload } = await api!.post<BodySignup, ReturnSignup>({
      endpoint: ""
    });
    return payload;
  };

  const forgot = async () => {
    const { payload } = await api!.post<BodyForgot, ReturnForgot>({
      endpoint: ""
    });
    return payload;
  };

  return {
    forgot,
    signin,
    signup
  };
};

export default useAuthService;
