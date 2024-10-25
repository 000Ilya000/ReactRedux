import { createSlice } from "@reduxjs/toolkit";

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
