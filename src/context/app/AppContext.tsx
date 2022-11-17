import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from "react";
import config from "@config";
import { DEFAULT_USER } from "@utils";
import { Actions } from "@typing/enums";

import type { ContextApp, ContextAppProvider, ContextAppState } from "@typing/contexts";
import type { PspsWindow } from "@typing/payment";

import reducer from "./reducer";

const AppContext = createContext<ContextApp>({
  global: {
    sessionId: null,
    user: DEFAULT_USER,
    onboarding: null,
    openPay: null,
    dlocal: null
  },
  dispatch: () => {}
});

export function AppProvider({ children }: ContextAppProvider) {
  const storageSession = localStorage.getItem("sessionId");
  const storageUser = localStorage.getItem("user");

  const initialState: ContextAppState = {
    sessionId: storageSession || null,
    user: storageUser ? JSON.parse(storageUser) : DEFAULT_USER,
    onboarding: null,
    openPay: null,
    dlocal: null
  };

  const [global, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ global, dispatch }), [global]);

  useEffect(() => {
    const pspWindow = (window as unknown as PspsWindow);
    // openPay
    const openpay = pspWindow.OpenPay;
    openpay.setId(config.openpay_id);
    openpay.setApiKey(config.openpay_apikey);
    openpay.setSandboxMode(process.env.NODE_ENV === "development");
    // DLocal
    const dlocal = pspWindow.dlocal(config.dlocal_apikey);

    dispatch({ type: Actions.ACTIVE_DLOCAL, payload: dlocal });
    dispatch({ type: Actions.ACTIVE_OPENPAY, payload: openpay });

    return () => {
      dispatch({ type: Actions.DEACTIVE_DLOCAL });
      dispatch({ type: Actions.DEACTIVE_OPENPAY });
    };
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
