import { useLocation, Navigate } from "react-router-dom";
import config from "@config";
import { DEFAULT_USER } from "@utils";
import { useAppContext } from "@context";

import type { ComponentType } from "react";
import type { HOCAuthState, HOCAuth, HOCAuthType } from "@typing/hocs";

function withAuth<T extends HOCAuth = HOCAuth>(Component: ComponentType<T>, type: HOCAuthType = "page") {
  const WithAuth = (props: Omit<T, keyof HOCAuth>) => {
    const { global: { user, sessionId } } = useAppContext();
    const { pathname, search, state } = useLocation();

    const from = (state as HOCAuthState)?.from || "/";
    const authenticated = !(JSON.stringify(user) === JSON.stringify(DEFAULT_USER) && sessionId === null);

    const unprotectedPages = config.auth_pages.some((page) => page === pathname);

    const toPaymentValidation = from.includes("payment") ? `${from}${user.tpId}` : from;

    if (authenticated && unprotectedPages) return <Navigate to={toPaymentValidation} replace />;

    if (
      (!authenticated && unprotectedPages)
      || (authenticated && !unprotectedPages)
      || (type === "component")
    ) {
      return <Component {...(props as T)} auth={authenticated} />;
    }

    return (<Navigate to="/auth/signin" state={{ from: `${pathname}${search}` }} replace />);
  };

  WithAuth.displayName = `withAuth(${Component.displayName ?? Component.name})`;

  return WithAuth;
}

export default withAuth;
