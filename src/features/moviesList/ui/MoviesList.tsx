import { Movie } from "../../../entities/movie/model/movie.types";
import MovieCard from "../../../entities/movie/ui/MovieCard/MovieCard";
import "./MoviesList.scss";

type Props = {
  movies: Movie[];
};

export const MoviesList = ({ movies }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="movies-list movies-list--empty">No movies found</div>
    );
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movies-list__item">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};
