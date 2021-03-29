import React from "react";
import jwt from "jsonwebtoken";

const token = localStorage.getItem("teamseyes-token");
let user: any = null;
if (token) {
  const res: any = jwt.decode(token);
  user = res?.user || null;
}

const DEFAULT_STATE = {
  user: null,
};

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

console.log(user);

export const UserCtx = React.createContext({ ...DEFAULT_STATE, user });

const reducer = (state: any, action: any) => {
  const { user } = action;
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user,
      };
    case ACTIONS.LOGOUT:
      return {
        user: null,
      };
    default: {
      return state;
    }
  }
};

// Dispatch
const login = (dispatch: any, token: string) => {
  localStorage.setItem("teamseyes-token", token);
  const { user }: any = jwt.decode(token);
  dispatch({ type: ACTIONS.LOGIN, user });
};

const logout = (dispatch: any) => {
  localStorage.removeItem("teamseyes-token");
  dispatch({ type: ACTIONS.LOGOUT });
};

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...DEFAULT_STATE,
    user,
  });

  const setter = {
    login: (token: string) => login(dispatch, token),
    logout: () => logout(dispatch),
  };

  const value = { ...state, ...setter };
  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
};

export default UserProvider;
