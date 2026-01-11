import { RootState } from "../../../app/store";

export const selectMovies = (state: RootState) => state.movies.items;
export const selectMoviesPage = (state: RootState) => state.movies.page;
export const selectMoviesTotalPages = (state: RootState) =>
  state.movies.totalPages;
export const selectMoviesLoading = (state: RootState) => state.movies.isLoading;
export const selectMoviesError = (state: RootState) => state.movies.error;
