import { Link } from "react-router-dom";
import { useBooksContext } from "../hooks/useBooksContext";

function BookOverview() {
  const { books } = useBooksContext();

  return (
    <div className="books-overview">
      {books && books?.length > 0 ? (
        <h3>
          You have got{" "}
          <span>
            {books.length} book{books.length > 1 ? "s" : ""}
          </span>
        </h3>
      ) : (
        <h3>You do not have book</h3>
      )}
      <Link to="/add-book">+ Create a book</Link>
    </div>
  );
}

export default BookOverview;
