import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../../entities/movie/model/movie.types";

const MAX_TOTAL_PAGES = 500;
type MoviesState = {
  items: Movie[];
  page: number;
  query: string;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: MoviesState = {
  items: [],
  page: 1,
  query: "",
  totalPages: 0,
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    fetchMoviesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMoviesSuccess(
      state,
      action: PayloadAction<{ items: Movie[]; totalPages: number }>
    ) {
      const { items, totalPages } = action.payload;
      state.items = items;
      state.totalPages = totalPages > MAX_TOTAL_PAGES ? 500 : totalPages;
      state.isLoading = false;
    },
    fetchMoviesFailure(state) {
      state.isLoading = false;
      state.error = "Failed to fetch movies";
    },
  },
});

export const {
  setPage,
  setQuery,
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
