const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type TmdbImageSize = "original" | "w500" | "w342";

const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

export const getTmdbImageUrl = (
  path?: string | null,
  size: TmdbImageSize = "original"
) => (path ? `${TMDB_IMAGE_BASE_URL}/${size}${normalizePath(path)}` : "");
