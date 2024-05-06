import React, { createContext, useReducer, ReactNode } from "react";

export interface Book {
  _id: string;
  cover: string;
  pages: number;
  published: number;
  createdAt: string;
}

export interface BooksState {
  books: Book[] | null;
}

type Action =
  | { type: "SET_BOOKS"; payload: Book[] }
  | { type: "CREATE_BOOK"; payload: Book }
  | { type: "SEARCH_BOOK"; payload: string }
  | { type: "DELETE_BOOK"; payload: Book };

export interface BooksContextType extends BooksState {
  dispatch: React.Dispatch<Action>;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export const booksReducer = (state: BooksState, action: Action): BooksState => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };

    case "CREATE_BOOK":
      return {
        ...state,
        books: state.books && [action.payload, ...state.books],
      };

    case "SEARCH_BOOK":
      return {
        ...state,
        books: state.books
          ? state.books.filter(
              (book) =>
                book.cover &&
                book.cover.toLowerCase().includes(action.payload?.toLowerCase())
            )
          : null,
      };

    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books
          ? state.books.filter((book) => book._id !== action.payload._id)
          : null,
      };

    default:
      return state;
  }
};

interface BookContextProviderProps {
  children: ReactNode;
}

export const BookContextProvider: React.FC<BookContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null,
  });

  const contextValue: BooksContextType = {
    ...state,
    dispatch,
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
