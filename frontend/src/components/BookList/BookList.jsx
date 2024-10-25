import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleBook } from "../../redux/books/actionCreators";
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
  console.log(onlyFavorite);
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
                {++i}. {book.title} by <strong>{book.author}</strong>
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
