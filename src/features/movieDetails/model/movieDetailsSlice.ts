import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../../../entities/movie/model/movie.types";

type MovieDetailsState = {
  movie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: MovieDetailsState = {
  movie: null,
  isLoading: false,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    fetchMovieStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMovieSuccess(state, action: PayloadAction<MovieDetails>) {
      state.movie = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchMovieFailure(state, action: PayloadAction<string>) {
      state.movie = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    clearMovie(state) {
      state.movie = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  clearMovie,
} = movieDetailsSlice.actions;

export const movieDetailsReducer = movieDetailsSlice.reducer;
