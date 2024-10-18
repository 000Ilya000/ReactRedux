import * as a from "./actionTypes";

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];
    case a.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case a.TOGGLE_FAVORITE:
      return state.map((book) => {
        if (book.id === action.payload) {
          return { ...book, isFavorite: !book.isFavorite }; // Создаем новый объект книги
        }
        return book; // Возвращаем неизмененный объект книги
      });
    default:
      return state;
  }
};

export default booksReducer;
