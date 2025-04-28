import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    allblogs: [],
    allAdminblogs: [],
    singleblog: null,
    searchblogByText: "",
    searchedQuery:"",
  },
  reducers: {
    setAllblogs: (state, action) => {
      state.allblogs = action.payload;
    },
    setSingleblog: (state, action) => {
      state.singleblog = action.payload;
    },
    setAllAdminblogs: (state, action) => {
      state.allAdminblogs = action.payload;
    },
    setSearchblogByText: (state, action) => {
      state.searchblogByText = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});
export const {
  setAllblogs,
  setSingleblog,
  setAllAdminblogs,
  setSearchblogByText,
  setSearchedQuery,
} = blogSlice.actions;
export default blogSlice.reducer;
