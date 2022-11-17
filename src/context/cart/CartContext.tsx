import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState
} from "react";
import { DEFAULT_CART, DEFAULT_CART_ERROR } from "@utils";
import { useAppContext } from "@context";
import { Currencies, Method } from "@typing/enums";

import type {
  ContextCart,
  ContextCartError,
  ContextCartProvider,
  ContextCartState,
  ContextCountryCart
} from "@typing/contexts";

import reducer from "./reducer";

const CartContext = createContext<ContextCart>({
  cart: DEFAULT_CART,
  error: DEFAULT_CART_ERROR,
  changeError: () => {},
  dispatch: () => {}
});

export function CartProvider({ children }: ContextCartProvider) {
  const { global: { user } } = useAppContext();

  const storageCart = localStorage.getItem("cart");
  const storageExchange = localStorage.getItem("cart_exchange");
  const storagePsp = localStorage.getItem("cart_psp");
  const storageMethod = localStorage.getItem("cart_method");

  const initialState: ContextCartState = {
    ...DEFAULT_CART,
    idPsp: storagePsp ? parseInt(storagePsp, 10) : NaN,
    method: storageMethod ?? Method.CARD,
    country: user.country as ContextCountryCart,
    exchangeCurrency: Currencies.USD,
    ...(storageCart ? JSON.parse(storageCart) : {}),
    ...(storageExchange ? JSON.parse(storageExchange) : {})
  };

  const [cart, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<ContextCartError>(DEFAULT_CART_ERROR);

  const changeError = useCallback((updatedError: ContextCartError, clean?: boolean) => {
    if (clean) {
      setError(DEFAULT_CART_ERROR);
    } else {
      setError((prevError) => ({ ...prevError, ...updatedError }));
    }
  }, []);

  const value = useMemo(() => ({
    cart,
    error,
    changeError,
    dispatch
  }), [cart, error, changeError]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
