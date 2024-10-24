import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // можно возвращать новый объект ссылаясь на прошлый
      // return { ...state, title: action.payload };
      // можно менять внутри slice состояние, тк reduxToolkit используем immer
      state.title = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setTitleFilter, resetFilters } = filterSlice.actions;
export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
