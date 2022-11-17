import { Actions, Currencies, Method } from "@typing/enums";

import type { ContextCartReducerAction, ContextCartState } from "@typing/contexts";

export default function reducer(state: ContextCartState, action: ContextCartReducerAction): ContextCartState {
  switch (action.type) {
    case Actions.ADD_TO_CART:
      const cart = action.payload;
      const exchange = {
        exchangeAmount: cart.amount,
        exchangeCurrency: state.currency
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cart_exchange", JSON.stringify(exchange));

      return {
        ...state,
        ...cart,
        ...exchange
      };
    case Actions.SET_PSP:
      localStorage.setItem("cart_psp", `${action.payload}`);
      return { ...state, idPsp: action.payload };
    case Actions.EXCHANGE_CART:
      localStorage.setItem("cart_exchange", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_PAYMENT_METHOD:
      localStorage.setItem("cart_method", `${action.payload}`);
      return {
        ...state,
        method: action.payload
      };
    case Actions.CLEAR_CART:
      localStorage.removeItem("cart");
      localStorage.removeItem("cart_exchange");
      localStorage.removeItem("cart_psp");
      localStorage.removeItem("cart_method");
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      return {
        amount: 0,
        currency: Currencies.USD,
        description: "",
        idPsp: NaN,
        method: Method.CARD,
        namePsp: "",
        country: user.country,
        exchangeAmount: 0,
        exchangeCurrency: Currencies.USD
      };
    default:
      return state;
  }
}
