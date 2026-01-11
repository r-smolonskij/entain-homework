import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  selectMovieDetails,
  selectMovieDetailsError,
  selectMovieDetailsLoading,
} from "../../features/movieDetails/model/movieDetailsSelectors";
import { fetchMovieById } from "../../features/movieDetails/model/movieDetailsThunks";

import { MovieDetails } from "../../features/movieDetails/ui/MovieDetails";
import "./MovieDetailsPage.scss";
import Loader from "../../shared/ui/Loader/Loader";

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const movie = useAppSelector(selectMovieDetails);
  const loading = useAppSelector(selectMovieDetailsLoading);
  const error = useAppSelector(selectMovieDetailsError);
  const showError = !!error;
  const showMovie = movie && !showError && !loading;

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (showError) {
      navigate("/not-found", { replace: true });
    }
  }, [showError, navigate]);

  return (
    <div className="movie-details-page">
      {showMovie && <MovieDetails movie={movie} />}
      {loading && (
        <div className="movie-details-page__loader">
          <Loader size="lg" label="Loading movie details..." />
        </div>
      )}
    </div>
  );
};
