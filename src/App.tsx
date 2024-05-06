import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";

// PAGES
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UpdateBook from "./pages/UpdateBook";

// COMPONENTS
import Navbar from "./components/Navbar";
import AddBook from "./components/AddBook";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />

        {user && <Navbar />}

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/add-book"
              element={user ? <AddBook /> : <Navigate to="/" />}
            />

            <Route
              path="/update/:id"
              element={user ? <UpdateBook /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
