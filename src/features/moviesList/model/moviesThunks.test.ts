import { fetchMovies } from "./moviesThunks";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  setPage,
} from "./moviesSlice";
import { moviesApi } from "../../../shared/api/moviesApi";
import { moviesFixture } from "../../../shared/test/fixtures/moviesFixture";

jest.mock("../../../shared/api/moviesApi", () => ({
  moviesApi: {
    getMovies: jest.fn(),
  },
}));

describe("fetchMovies", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (moviesApi.getMovies as jest.Mock).mockReset();
  });

  it("dispatches start and success when API resolves", async () => {
    (moviesApi.getMovies as jest.Mock).mockResolvedValue({
      items: moviesFixture,
      page: 1,
      totalPages: 3,
    });

    await fetchMovies(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setPage(1));
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchMoviesSuccess({ items: moviesFixture, totalPages: 3 })
    );
  });

  it("dispatches failure when API rejects", async () => {
    (moviesApi.getMovies as jest.Mock).mockRejectedValue(new Error("fail"));

    await fetchMovies(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setPage(1));
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
    expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure());
  });
});
