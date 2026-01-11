import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  moviesReducer,
  setPage,
  setQuery,
} from "./moviesSlice";
import { moviesFixture } from "../../../shared/test/fixtures/moviesFixture";

describe("moviesSlice", () => {
  it("handles setPage", () => {
    const state = moviesReducer(
      {
        items: [],
        page: 1,
        query: "",
        totalPages: 0,
        isLoading: false,
        error: null,
      },
      setPage(3)
    );
    expect(state.page).toBe(3);
  });

  it("handles setQuery", () => {
    const state = moviesReducer(
      {
        items: [],
        page: 1,
        query: "",
        totalPages: 0,
        isLoading: false,
        error: null,
      },
      setQuery("star")
    );
    expect(state.query).toBe("star");
  });

  it("handles fetchMoviesStart", () => {
    const state = moviesReducer(undefined, fetchMoviesStart());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("handles fetchMoviesSuccess", () => {
    const state = moviesReducer(
      {
        items: [],
        page: 1,
        query: "",
        totalPages: 0,
        isLoading: true,
        error: null,
      },
      fetchMoviesSuccess({ items: moviesFixture, totalPages: 10 })
    );
    expect(state.items).toEqual(moviesFixture);
    expect(state.totalPages).toBe(10);
    expect(state.isLoading).toBe(false);
  });

  it("caps totalPages at 500", () => {
    const state = moviesReducer(
      {
        items: [],
        page: 1,
        query: "",
        totalPages: 0,
        isLoading: true,
        error: null,
      },
      fetchMoviesSuccess({ items: moviesFixture, totalPages: 600 })
    );
    expect(state.totalPages).toBe(500);
  });

  it("handles fetchMoviesFailure", () => {
    const state = moviesReducer(
      {
        items: moviesFixture,
        page: 1,
        query: "",
        totalPages: 10,
        isLoading: true,
        error: null,
      },
      fetchMoviesFailure()
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Failed to fetch movies");
  });
});
