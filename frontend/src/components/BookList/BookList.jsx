import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleBook } from "../../redux/slices/bookSlice";
import {
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

function BookList(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavorite = useSelector(selectOnlyFavorite);
  const filtredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavorite ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const hightLightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filtredBooks.length === 0 ? (
        <p>No books avaible</p>
      ) : (
        <ul>
          {filtredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {hightLightMatch(book.title, titleFilter)} by{" "}
                <strong>{hightLightMatch(book.author, authorFilter)}</strong> (
                {book.source})
              </div>
              <div className="book-actions">
                {book.isFavorite ? (
                  <BsBookmarkStarFill
                    onClick={() => dispatch(toggleBook(book.id))}
                    className="star-icon"
                  />
                ) : (
                  <BsBookmarkStar
                    onClick={() => dispatch(toggleBook(book.id))}
                    className="star-icon"
                  />
                )}
                <button onClick={() => dispatch(deleteBook(book.id))}>
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
