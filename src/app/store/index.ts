import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "../../features/moviesList/model/moviesSlice";
import { movieDetailsReducer } from "../../features/movieDetails/model/movieDetailsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
