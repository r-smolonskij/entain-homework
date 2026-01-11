import { fetchMovies } from "./moviesThunks";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  setPage,
  setQuery,
} from "./moviesSlice";
import { moviesApi } from "../../../shared/api/moviesApi";
import { moviesFixture } from "../../../shared/test/fixtures/moviesFixture";

jest.mock("../../../shared/api/moviesApi", () => ({
  moviesApi: {
    getMovies: jest.fn(),
    searchMovies: jest.fn(),
  },
}));

describe("fetchMovies", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (moviesApi.getMovies as jest.Mock).mockReset();
    (moviesApi.searchMovies as jest.Mock).mockReset();
  });

  it("dispatches start and success when API resolves", async () => {
    (moviesApi.getMovies as jest.Mock).mockResolvedValue({
      results: moviesFixture,
      page: 1,
      total_pages: 3,
    });

    await fetchMovies({ page: 1, query: "" })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setPage(1));
    expect(dispatch).toHaveBeenCalledWith(setQuery(""));
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchMoviesSuccess({ items: moviesFixture, totalPages: 3 })
    );
  });

  it("dispatches start and success when search API resolves", async () => {
    (moviesApi.searchMovies as jest.Mock).mockResolvedValue({
      results: moviesFixture,
      page: 1,
      total_pages: 2,
    });

    await fetchMovies({ page: 1, query: "star" })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setPage(1));
    expect(dispatch).toHaveBeenCalledWith(setQuery("star"));
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchMoviesSuccess({ items: moviesFixture, totalPages: 2 })
    );
  });

  it("dispatches failure when API rejects", async () => {
    (moviesApi.getMovies as jest.Mock).mockRejectedValue(new Error("fail"));

    await fetchMovies({ page: 1, query: "" })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setPage(1));
    expect(dispatch).toHaveBeenCalledWith(setQuery(""));
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure());
  });
});
