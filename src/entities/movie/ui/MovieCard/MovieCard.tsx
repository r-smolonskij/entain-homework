import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../model/movie.types";
import { getTmdbImageUrl } from "../../../../shared/lib/tmdbImage";
import "./MovieCard.scss";
import { useAppDispatch } from "../../../../app/store/hooks";
import { clearMovie } from "../../../../features/movieDetails/model/movieDetailsSlice";
import noImage from "../../../../shared/assets/img/no-image.png";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500");

  const handleOpenDetails = () => {
    dispatch(clearMovie()); // Clear movie details before navigating to avoid display "NotFoundPage"
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
    >
      {posterUrl ? (
        <div
          className="movie-card__image"
          style={
            posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined
          }
          role="img"
        ></div>
      ) : (
        <div className="movie-card__image-fallback">
          <img src={noImage} alt={movie.title} />
        </div>
      )}
      <div className="movie-card__content">
        <p className="movie-card__title">
          <span>
            {movie.title}
            {movie.vote_count > 0 && ` (⭐ ${movie.vote_average.toFixed(1)})`}
          </span>
        </p>
        <i className="movie-card__overview">{movie.overview}</i>
      </div>
    </div>
  );
};

export default MovieCard;
