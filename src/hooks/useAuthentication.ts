import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuthentication(auth: boolean) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const redirect = useCallback((to?: string) => {
    const redirection = (auth && to) ? to : "/signin";
    const options = !auth ? {
      state: {
        from: `${to ?? pathname}${search}`
      }
    } : {};
    navigate(redirection, options);
  }, [navigate, pathname, search, auth]);

  return { redirect };
}
