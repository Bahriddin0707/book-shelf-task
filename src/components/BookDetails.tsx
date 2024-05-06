import { useBooksContext } from "../hooks/useBooksContext";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// date-fns
import { format } from "date-fns";

import { AuthContextType } from "../context/AuthContext";

interface Book {
  _id?: string;
  cover?: string;
  pages?: number;
  published?: number;
  createdAt?: string;
}

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const { dispatch } = useBooksContext();
  const { user }: AuthContextType = useAuthContext();

  const notify = (deletedBook: Book) =>
    toast.success(`${deletedBook.cover} book Deleted`);

  const handleDelete = async (id: string) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://book-shelf-server.onrender.com/api/books/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: data.deletedBook });
      notify(data.deletedBook);
    }
  };

  const handleEdit = async () => {
    if (!user) {
      return;
    }
  };

  return (
    <div className="book-details">
      <h4>{book.cover}</h4>
      <p>
        <strong>Pages: </strong>
        {book.pages}
      </p>
      <p>
        <strong>Published: </strong>
        {book.published}
      </p>

      <p>
        <strong>Isbn: </strong>
        {book._id}
      </p>

      {book.createdAt && (
        <p>{format(new Date(book.createdAt), "MMMM do yyyy, h:mm:ss a")}</p>
      )}

      <span onClick={() => handleDelete(book._id!)} className="delete-btn">
        <DeleteIcon />
      </span>

      <Link to={`update/${book._id}`} onClick={handleEdit} className="edit-btn">
        <EditIcon />
      </Link>
    </div>
  );
};

export default BookDetails;
