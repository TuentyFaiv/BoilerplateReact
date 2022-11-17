import { DEFAULT_USER } from "@utils";
import { Actions } from "@typing/enums";

import type { ContextAppReducerAction, ContextAppState, ContextAppUser } from "@typing/contexts";

export default function reducer(state: ContextAppState, action: ContextAppReducerAction): ContextAppState {
  switch (action.type) {
    case Actions.SIGNIN:
      const { sessionId, onboarding, profileImage: image, ...defaultUser } = action.payload;
      const profileImage = (image === "" || image === null || image === undefined) ? DEFAULT_USER["profileImage"] : image;
      const user: ContextAppUser = { ...defaultUser, profileImage };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("sessionId", sessionId);
      return {
        ...state,
        user,
        sessionId,
        onboarding
      };
    case Actions.SIGNOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("sessionId");
      return {
        ...state,
        user: DEFAULT_USER,
        sessionId: null
      };
    case Actions.CHANGE_ONBOARDING:
      return {
        ...state,
        onboarding: action.payload
      };
    case Actions.ACTIVE_OPENPAY:
      return {
        ...state,
        openPay: action.payload
      };
    case Actions.DEACTIVE_OPENPAY:
      return {
        ...state,
        openPay: null
      };
    case Actions.ACTIVE_DLOCAL:
      return {
        ...state,
        dlocal: action.payload
      };
    case Actions.DEACTIVE_DLOCAL:
      return {
        ...state,
        dlocal: null
      };
    default:
      return state;
  }
}
