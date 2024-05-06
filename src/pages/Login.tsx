import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const formHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <form onSubmit={formHandler} className="login">
        <h3>Please Enter Your Details to login</h3>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className="error">{error}</div>

        <button disabled={isLoading} type="submit">
          Submit
        </button>

        <div className="account">
          Do not you have an account? <Link to="/signup">Go to sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
