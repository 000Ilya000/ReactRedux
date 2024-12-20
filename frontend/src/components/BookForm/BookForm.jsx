import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import booksData from "../../data/books.json";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/bookSlice";
import { setError } from "../../redux/slices/errorSlice";
import createBookWithId from "../../utils/createBookWithId";
import "./BookForm.css";

function BookForm(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId({ title, author }, "manual");
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author!"));
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    const randomBookWidthId = createBookWithId(randomBook, "random");
    dispatch(addBook(randomBookWidthId, "random"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          disabled={isLoadingViaAPI}
          onClick={() =>
            dispatch(fetchBook("http://localhost:4000/random-book-delayed"))
          }
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
