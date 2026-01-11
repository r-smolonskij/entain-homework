import { AppDispatch } from "../../../app/store";
import { moviesApi } from "../../../shared/api/moviesApi";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  setPage,
  setQuery,
} from "./moviesSlice";

type FetchMoviesParams = {
  page: number;
  query?: string;
};

export const fetchMovies =
  ({ page, query = "" }: FetchMoviesParams) =>
  async (dispatch: AppDispatch) => {
  try {
    dispatch(setPage(page));
    dispatch(setQuery(query));
    dispatch(fetchMoviesStart());

    const normalizedQuery = query.trim();
    const response = normalizedQuery
      ? await moviesApi.searchMovies(normalizedQuery, page)
      : await moviesApi.getMovies(page);
    dispatch(
      fetchMoviesSuccess({
        items: response.results,
        totalPages: response.total_pages,
      })
    );
  } catch (error) {
    dispatch(fetchMoviesFailure());
  }
};
