import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

// Define the types for context state
export type SearchState = {
  search: string;
};

// Define the action types for reducer
type SearchAction = {
  type: "SET_SEARCH";
  payload: string;
};

// Define the initial state for the context
const initialSearchState: SearchState = {
  search: "",
};

// Create the context
export const SearchContext = createContext<{
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
}>({
  state: initialSearchState,
  dispatch: () => null,
});

// Define the reducer function
const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

// Define the SearchContextProvider component
type SearchContextProviderProps = {
  children: ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
