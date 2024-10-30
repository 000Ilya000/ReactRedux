import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleBook: (state, action) => {
      return state.map((book) => {
        if (book.id === action.payload) {
          return { ...book, isFavorite: !book.isFavorite }; // Создаем новый объект книги
        }
        return book; // Возвращаем неизмененный объект книги
      });
    },
  },
});

export default booksSlice.reducer;
export const { addBook, deleteBook, toggleBook } = booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log("Error fetching random Book", error);
  }
};
