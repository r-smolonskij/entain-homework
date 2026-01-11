import { getTmdbImageUrl } from "./tmdbImage";

describe("getTmdbImageUrl", () => {
  it("builds a TMDB image URL with size and path", () => {
    expect(getTmdbImageUrl("/poster.jpg", "w500")).toBe(
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
  });

  it("normalizes a path without leading slash", () => {
    expect(getTmdbImageUrl("backdrop.jpg", "original")).toBe(
      "https://image.tmdb.org/t/p/original/backdrop.jpg"
    );
  });

  it("returns empty string for empty path", () => {
    expect(getTmdbImageUrl("")).toBe("");
    expect(getTmdbImageUrl(null)).toBe("");
  });
});
