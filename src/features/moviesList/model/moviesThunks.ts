import { AppDispatch } from "../../../app/store";
import { moviesApi } from "../../../shared/api/moviesApi";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  setPage,
} from "./moviesSlice";

export const fetchMovies = (page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPage(page));
    dispatch(fetchMoviesStart());

    const response = await moviesApi.getMovies(page);
    console.log(response);
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
