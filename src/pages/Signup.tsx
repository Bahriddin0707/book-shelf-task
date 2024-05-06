import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup, isLoading, error } = useSignup();

  const formHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await signup(name, email, password, passwordConfirm);
  };

  return (
    <form onSubmit={formHandler} className="signup">
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

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

      <label>Password:</label>
      <input
        type="text"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
      />

      {error && <div className="error">{error}</div>}
      <button disabled={isLoading} type="submit">
        Submit
      </button>

      <div className="account">
        Already signed up? <Link to="/login">Go to sign in</Link>
      </div>
    </form>
  );
}

export default Signup;
