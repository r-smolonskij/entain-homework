import Button from "../../shared/ui/Button/Button";
import Loader from "../../shared/ui/Loader/Loader";
import {
  selectMovies,
  selectMoviesError,
  selectMoviesLoading,
  selectMoviesPage,
  selectMoviesTotalPages,
} from "../../features/moviesList/model/moviesSelectors";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { useEffect } from "react";
import { fetchMovies } from "../../features/moviesList/model/moviesThunks";
import { MoviesList } from "../../features/moviesList/ui/MoviesList";
import Pagination from "../../shared/ui/Pagination/Pagination";
import ErrorState from "../../shared/ui/ErrorState/ErrorState";
import "./MoviesPage.scss";

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectMoviesLoading);
  const movies = useAppSelector(selectMovies);
  const page = useAppSelector(selectMoviesPage);
  const totalPages = useAppSelector(selectMoviesTotalPages);
  const error = useAppSelector(selectMoviesError);
  const hasMovies = movies.length > 0;
  const showError = !!error;
  const showMovies = hasMovies && !showError && !isLoading;

  useEffect(() => {
    dispatch(fetchMovies(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMovies(newPage));
  };

  return (
    <section className="movies-page">
      <h1 className="movies-page__title">Entain cinema</h1>
      <div className="movies-page__content">
        {showError && (
          <ErrorState
            message={error}
            actions={
              <>
                <Button
                  variant="outlined"
                  color="var(--color-error)"
                  onClick={() => dispatch(fetchMovies(page))}
                >
                  Retry
                </Button>
                <Button
                  variant="outlined"
                  color="var(--color-error)"
                  onClick={() => dispatch(fetchMovies(1))}
                >
                  Load first page
                </Button>
              </>
            }
          />
        )}
        {isLoading && <Loader label="Loading movies..." size="lg" />}
        {showMovies && (
          <>
            <MoviesList movies={movies} />
            <div className="movies-page__pagination">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
