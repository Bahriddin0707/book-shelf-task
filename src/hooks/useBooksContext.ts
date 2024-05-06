import { useContext } from "react";
import { BooksContext, BooksContextType } from "../context/BookContext";

export const useBooksContext = (): BooksContextType => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error(
      "useBooksContext must be used inside a BookContextProvider"
    );
  }

  return context;
};
