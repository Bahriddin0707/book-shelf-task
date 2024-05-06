import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchBook from "./SearchBook";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            Books <span>List</span>
          </h1>
        </Link>

        {location.pathname !== "/add-book" &&
        !location.pathname.includes("/update") ? (
          <SearchBook />
        ) : null}

        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/signup">Sign up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
