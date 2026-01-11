import Button from "../../shared/ui/Button/Button";
import Loader from "../../shared/ui/Loader/Loader";
import {
  selectMovies,
  selectMoviesError,
  selectMoviesLoading,
  selectMoviesPage,
  selectMoviesQuery,
  selectMoviesTotalPages,
} from "../../features/moviesList/model/moviesSelectors";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "../../features/moviesList/model/moviesThunks";
import { MoviesList } from "../../features/moviesList/ui/MoviesList";
import Pagination from "../../shared/ui/Pagination/Pagination";
import ErrorState from "../../shared/ui/ErrorState/ErrorState";
import "./MoviesPage.scss";

const SEARCH_DEBOUNCE_DELAY = 300;
export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectMoviesLoading);
  const movies = useAppSelector(selectMovies);
  const page = useAppSelector(selectMoviesPage);
  const query = useAppSelector(selectMoviesQuery);
  const totalPages = useAppSelector(selectMoviesTotalPages);
  const error = useAppSelector(selectMoviesError);
  const [searchValue, setSearchValue] = useState(query);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);
  const hasMovies = movies.length > 0;
  const showError = !!error;
  const showLoader = isLoading || isSearching;
  const showMovies = hasMovies && !showError && !showLoader;
  const loaderLabel =
    searchValue.trim().length > 0 ? "Searching movies..." : "Loading movies...";
  const showNoResults =
    !showLoader && !showError && !hasMovies && query.trim().length > 0;

  useEffect(() => {
    dispatch(fetchMovies({ page, query }));
  }, [dispatch]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const trimmedSearch = searchValue.trim();
    if (trimmedSearch === query) {
      if (searchTimeoutRef.current !== null) {
        window.clearTimeout(searchTimeoutRef.current);
      }
      return;
    }

    setIsSearching(true);
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    const id = window.setTimeout(() => {
      dispatch(fetchMovies({ page: 1, query: trimmedSearch })).finally(() =>
        setIsSearching(false)
      );
    }, SEARCH_DEBOUNCE_DELAY);
    searchTimeoutRef.current = id;

    return () => {
      window.clearTimeout(id);
    };
  }, [dispatch, query, searchValue]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMovies({ page: newPage, query }));
  };

  const handleClearSearch = () => {
    setSearchValue("");
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current);
    }
    dispatch(fetchMovies({ page: 1, query: "" }));
  };

  return (
    <section className="movies-page">
      <h1 className="movies-page__title">Entain cinema</h1>
      <form className="movies-page__search">
        <label htmlFor="movies-search">Search movies</label>
        <input
          id="movies-search"
          type="search"
          placeholder="Search movies..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          aria-label="Search movies"
        />
      </form>
      <div className="movies-page__content">
        {showError && (
          <ErrorState
            message={error}
            actions={
              <>
                <Button
                  variant="outlined"
                  color="var(--color-error)"
                  onClick={() => dispatch(fetchMovies({ page, query }))}
                >
                  Retry
                </Button>
                <Button
                  variant="outlined"
                  color="var(--color-error)"
                  onClick={() => dispatch(fetchMovies({ page: 1, query }))}
                >
                  Load first page
                </Button>
              </>
            }
          />
        )}
        {showLoader && <Loader label={loaderLabel} size="lg" />}
        {showNoResults && (
          <ErrorState
            title={`No results found for "${query}".`}
            actions={
              <Button variant="outlined" onClick={handleClearSearch}>
                Clear search
              </Button>
            }
          />
        )}
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
