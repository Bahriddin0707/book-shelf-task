import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// context
import { AuthContextProvider } from "./context/AuthContext";
import { BookContextProvider } from "./context/BookContext";
import { SearchContextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <BookContextProvider>
          <App />
        </BookContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
