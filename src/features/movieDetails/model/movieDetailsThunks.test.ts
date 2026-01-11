import { fetchMovieById } from "./movieDetailsThunks";
import {
  fetchMovieFailure,
  fetchMovieStart,
  fetchMovieSuccess,
} from "./movieDetailsSlice";
import { moviesApi } from "../../../shared/api/moviesApi";
import { movieDetailsFixture } from "../../../shared/test/fixtures/movieDetailsFixture";

jest.mock("../../../shared/api/moviesApi", () => ({
  moviesApi: {
    getMovieById: jest.fn(),
  },
}));

describe("fetchMovieById", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (moviesApi.getMovieById as jest.Mock).mockReset();
  });

  it("dispatches start and success when API resolves", async () => {
    (moviesApi.getMovieById as jest.Mock).mockResolvedValue(
      movieDetailsFixture
    );

    await fetchMovieById("1")(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchMovieStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchMovieSuccess(movieDetailsFixture)
    );
  });

  it("dispatches failure when API rejects", async () => {
    const error = new Error("Failed to fetch movie");
    (moviesApi.getMovieById as jest.Mock).mockRejectedValue(error);

    await fetchMovieById("1")(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchMovieStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchMovieFailure(error.message)
    );
  });
});
