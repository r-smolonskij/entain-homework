import { Movie, MovieDetails } from "../../entities/movie/model/movie.types";
import { API_BASE_URL } from "../config/api";

type MoviesListResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
};

const moviesApiPath = `${API_BASE_URL}/movies`;

export const moviesApi = {
  async getMovies(page: number): Promise<MoviesListResponse> {
    const response = await fetch(`${moviesApiPath}?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  },

  async searchMovies(
    query: string,
    page?: number
  ): Promise<MoviesListResponse> {
    const response = await fetch(
      `${moviesApiPath}/search?query=${query}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  },

  async getMovieById(
    id: string,
    appendToResponse?: string
  ): Promise<MovieDetails> {
    const response = await fetch(
      `${moviesApiPath}/${id}?append_to_response=${appendToResponse}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    return response.json();
  },
};
