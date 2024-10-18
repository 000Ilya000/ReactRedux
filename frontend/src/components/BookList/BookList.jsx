import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleBook } from "../../redux/books/actionCreators";
import "./BookList.css";

function BookList(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books avaible</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => dispatch(toggleBook(book.id))}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
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
