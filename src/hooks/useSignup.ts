import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://book-shelf-server.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // save the user on Local Storage
      localStorage.setItem("user", JSON.stringify(data));

      // update the Auth Context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
