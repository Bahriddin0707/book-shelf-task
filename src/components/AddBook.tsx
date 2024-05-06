import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

// REACT HOT TOAST
import toast from "react-hot-toast";

function AddBook() {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const [cover, setCover] = useState("");
  const [pages, setPages] = useState("");
  const [published, setPublished] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const navigate = useNavigate();
  const notify = () => toast.success("A new book created");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(
      "https://book-shelf-server.onrender.com/api/books",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ cover, pages, published }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    if (response.ok) {
      setCover("");
      setPages("");
      setPublished("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_BOOK", payload: data.newBook });
      notify();
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="book-form">
      <h3>Add a New Book</h3>
      <label>Cover: </label>
      <input
        type="text"
        onChange={(e) => {
          setCover(e.target.value);
        }}
        value={cover}
        className={emptyFields.includes("cover") ? "error" : ""}
      />
      <label>Pages: </label>
      <input
        type="number"
        onChange={(e) => {
          setPages(e.target.value);
        }}
        value={pages}
        className={emptyFields.includes("pages") ? "error" : ""}
      />
      <label>Published: </label>
      <input
        type="number"
        onChange={(e) => {
          setPublished(e.target.value);
        }}
        value={published}
        className={emptyFields.includes("published") ? "error" : ""}
      />

      <Link to="/" className="cancel-btn">
        <HighlightOffOutlinedIcon />
      </Link>

      <div className="book-form-btns">
        <Link to="/" className="close-btn">
          Close
        </Link>
        <button>Add Book</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default AddBook;
