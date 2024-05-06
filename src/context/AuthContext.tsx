import React, { createContext, useReducer, useContext, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface AuthState {
  user: User | null;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export interface AuthContextType extends AuthState {
  dispatch: (action: AuthAction) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Initialize user from localStorage on mount
  React.useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
