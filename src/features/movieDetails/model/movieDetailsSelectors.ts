import { RootState } from "../../../app/store";

export const selectMovieDetails = (state: RootState) =>
  state.movieDetails.movie;

export const selectMovieDetailsLoading = (state: RootState) =>
  state.movieDetails.isLoading;

export const selectMovieDetailsError = (state: RootState) =>
  state.movieDetails.error;
