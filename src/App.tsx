import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage/MovieDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
