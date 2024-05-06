import { useEffect } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSearchContext } from "../hooks/useSearchContext";

import { AuthContextType } from "../context/AuthContext";

// Components
import BookDetails from "../components/BookDetails";
import BookOverview from "../components/BookOverview";

function Home() {
  const { books, dispatch } = useBooksContext();
  const { user }: AuthContextType = useAuthContext();
  const {
    state: { search },
  } = useSearchContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await fetch(
          "https://book-shelf-server.onrender.com/api/books/",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();

        dispatch({ type: "SET_BOOKS", payload: data.books });
        dispatch({ type: "SEARCH_BOOK", payload: search });
      } catch (error: any) {
        console.error("Error fetching books: ", error.message);
      }
    };

    fetchWorkouts();
  }, [dispatch, user, search]);

  return (
    <div className="home">
      <BookOverview />
      <div className="books">
        {books &&
          books.map((book, i) => {
            return <BookDetails book={book} key={i} />;
          })}
      </div>
    </div>
  );
}

export default Home;
