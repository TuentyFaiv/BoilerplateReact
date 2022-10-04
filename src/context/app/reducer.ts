import { Actions } from "@typing/enums";

import type { ContextAppReducerAction, ContextAppState } from "@typing/contexts";

const DEFAULT_IMAGE = "";

export default function reducer(state: ContextAppState, action: ContextAppReducerAction): ContextAppState {
  switch (action.type) {
    case Actions.SIGNIN:
      const { sessionId, onboarding, profileImage: imageUrl, ...defaultUser } = action.payload;
      const profileImage = (imageUrl === "" || imageUrl === null || imageUrl === undefined) ? DEFAULT_IMAGE : imageUrl;
      const user = { ...defaultUser, profileImage };
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
        user: {},
        sessionId: null
      };
    case Actions.CHANGE_ONBOARDING:
      return {
        ...state,
        onboarding: action.payload
      };
    default:
      return state;
  }
}
