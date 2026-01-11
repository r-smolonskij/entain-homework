import { AppDispatch } from "../../../app/store";
import { moviesApi } from "../../../shared/api/moviesApi";
import {
  fetchMovieFailure,
  fetchMovieStart,
  fetchMovieSuccess,
} from "./movieDetailsSlice";

export const fetchMovieById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchMovieStart());

    const movie = await moviesApi.getMovieById(id);

    dispatch(fetchMovieSuccess(movie));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch(fetchMovieFailure(message));
  }
};
