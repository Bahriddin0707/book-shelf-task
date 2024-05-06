import React, { useState, useEffect } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

// REACT HOT TOAST
import toast from "react-hot-toast";

function UpdateBook() {
  const [cover, setCover] = useState<string>("");
  const [pages, setPages] = useState<number | string>("");
  const [published, setPublished] = useState<number | string>("");

  const { books } = useBooksContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  const navigate = useNavigate();
  const notify = (cover: any) => toast.success(`${cover} book is just updated`);

  useEffect(() => {
    const selectedBook = books?.find((item) => item._id === id);
    if (selectedBook) {
      setCover(selectedBook.cover);
      setPages(selectedBook.pages);
      setPublished(selectedBook.published);
    }
  }, [id, books]);

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://book-shelf-server.onrender.com/api/books/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ cover, pages, published }),
      }
    );

    if (response.ok) {
      navigate("/");
      notify(cover);
    }
  };

  return (
    <form onSubmit={updateHandler} className="book-form">
      <h3>Update Book</h3>
      <label>Cover: </label>
      <input
        type="text"
        onChange={(e) => {
          setCover(e.target.value);
        }}
        value={cover}
      />

      <label>Pages: </label>
      <input
        type="number"
        onChange={(e) => {
          setPages(e.target.value);
        }}
        value={pages}
      />

      <label>Published: </label>
      <input
        type="number"
        onChange={(e) => {
          setPublished(e.target.value);
        }}
        value={published}
      />

      <Link to="/" className="cancel-btn">
        <HighlightOffOutlinedIcon />
      </Link>

      <div className="book-form-btns">
        <Link to="/" className="close-btn">
          Close
        </Link>
        <button>Update Book</button>
      </div>
    </form>
  );
}

export default UpdateBook;
