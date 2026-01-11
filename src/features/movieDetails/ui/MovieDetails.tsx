import React, { useState } from "react";
import { MovieDetails as MovieDetailsType } from "../../../entities/movie/model/movie.types";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/Button/Button";
import ImageModal from "../../../shared/ui/ImageModal/ImageModal";
import { getTmdbImageUrl } from "../../../shared/lib/tmdbImage";
import noImage from "../../../shared/assets/img/no-image.png";
import "./MovieDetails.scss";
import { formatDate } from "../../../shared/lib/date";

type Props = {
  movie: MovieDetailsType;
};
export const MovieDetails = ({ movie }: Props) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const posterUrl = getTmdbImageUrl(movie.poster_path, "original");
  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, "original");

  return (
    <div className="movie-details">
      <div
        className="movie-details__hero"
        style={
          backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined
        }
      >
        <div className="movie-details__hero-overlay" />
        <div className="movie-details__hero-content">
          <Button
            className="movie-details__back-button"
            variant="outlined"
            color="white"
            onClick={() => navigate("/")}
          >
            ←
          </Button>
          <div className="movie-details__layout">
            <div className="movie-details__poster">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  onClick={() => setActiveImage(posterUrl)}
                />
              ) : (
                <div className="movie-details__poster-fallback">
                  <img src={noImage} alt={movie.title} />
                </div>
              )}
            </div>
            <div className="movie-details__content">
              <h1 className="movie-details__title">{movie.title}</h1>
              <div className="movie-details__stats_container">
                {!!movie.release_date && (
                  <span>
                    <span className="movie-details__stats_title">
                      Released:
                    </span>{" "}
                    <i>{formatDate(movie.release_date)}</i>
                  </span>
                )}
                <span>
                  <span className="movie-details__stats_title">Rating:</span>{" "}
                  <i>
                    ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count}{" "}
                    votes)
                  </i>
                </span>
                {!!movie.genres.length && (
                  <span className="movie-details__stats-chips-container">
                    <span className="movie-details__stats_title">Genres:</span>{" "}
                    {movie.genres.map((g) => (
                      <span key={g.name} className="movie-details__stats-chip">
                        {g.name}
                      </span>
                    ))}
                  </span>
                )}
                {!!movie.production_companies.length && (
                  <span className="movie-details__stats-chips-container">
                    <span className="movie-details__stats_title">
                      Companies:
                    </span>{" "}
                    {movie.production_companies.map((c) => (
                      <span key={c.name} className="movie-details__stats-chip">
                        {c.name}
                      </span>
                    ))}
                  </span>
                )}
                {!!movie.overview.length && (
                  <span>
                    <span className="movie-details__stats_title">
                      Overview:
                    </span>{" "}
                    <i>{movie.overview}</i>
                  </span>
                )}
              </div>
            </div>
          </div>
          {!!movie.images?.backdrops.length && (
            <div className="movie-details__gallery">
              {movie.images?.backdrops.slice(0, 10).map((b) => (
                <div
                  key={b.file_path}
                  className="movie-details__gallery-item"
                  onClick={() =>
                    setActiveImage(getTmdbImageUrl(b.file_path, "original"))
                  }
                >
                  <img
                    onClick={() =>
                      setActiveImage(getTmdbImageUrl(b.file_path, "original"))
                    }
                    src={getTmdbImageUrl(b.file_path, "w342")}
                    alt={movie.title}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ImageModal
        isOpen={!!activeImage}
        src={activeImage ?? ""}
        alt={movie.title}
        onClose={() => setActiveImage(null)}
      />
    </div>
  );
};
