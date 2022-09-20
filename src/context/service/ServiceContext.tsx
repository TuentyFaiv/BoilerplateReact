import { createContext, useContext, useMemo } from "react";
import { Http, useAppContext } from "@context";

import type { ContextService, ContextServiceProvider } from "@typing/contexts";

const ServiceContext = createContext<ContextService>({
  api: null
});

export function ServiceProvider({ children }: ContextServiceProvider) {
  const { global: { sessionId } } = useAppContext();

  const api = useMemo(() => new Http(sessionId ?? ""), [sessionId]);

  const value = useMemo(() => ({ api }), [api]);

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);
