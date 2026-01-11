import {
  clearMovie,
  fetchMovieFailure,
  fetchMovieStart,
  fetchMovieSuccess,
  movieDetailsReducer,
} from "./movieDetailsSlice";
import { movieDetailsFixture } from "../../../shared/test/fixtures/movieDetailsFixture";

describe("movieDetailsSlice", () => {
  it("handles fetchMovieStart", () => {
    const state = movieDetailsReducer(undefined, fetchMovieStart());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("handles fetchMovieSuccess", () => {
    const state = movieDetailsReducer(
      { movie: null, isLoading: true, error: "Failed" },
      fetchMovieSuccess(movieDetailsFixture)
    );
    expect(state.movie).toEqual(movieDetailsFixture);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("handles fetchMovieFailure", () => {
    const errorMessage = "Failed to fetch movie";
    const state = movieDetailsReducer(
      { movie: movieDetailsFixture, isLoading: true, error: null },
      fetchMovieFailure(errorMessage)
    );
    expect(state.movie).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("handles clearMovie", () => {
    const state = movieDetailsReducer(
      { movie: movieDetailsFixture, isLoading: true, error: "Failed" },
      clearMovie()
    );
    expect(state.movie).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
