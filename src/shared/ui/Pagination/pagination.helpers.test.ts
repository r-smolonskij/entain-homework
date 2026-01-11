import { buildPageItems, clampPage } from "./pagination.helpers";

describe("pagination.helpers", () => {
  describe("clampPage", () => {
    it("clamps below range to 1", () => {
      expect(clampPage(0, 10)).toBe(1);
    });

    it("clamps above range to totalPages", () => {
      expect(clampPage(99, 10)).toBe(10);
    });

    it("returns the same page when within range", () => {
      expect(clampPage(5, 10)).toBe(5);
    });
  });

  describe("buildPageItems", () => {
    it("returns full range when totalPages is small", () => {
      expect(buildPageItems(1, 3)).toEqual([1, 2, 3]);
    });

    it("includes ellipses around a middle window", () => {
      expect(buildPageItems(5, 10)).toEqual([
        1,
        "ellipsis",
        4,
        5,
        6,
        "ellipsis",
        10,
      ]);
    });

    it("shows leading range without first ellipsis", () => {
      expect(buildPageItems(2, 10)).toEqual([1, 2, 3, 4, "ellipsis", 10]);
    });

    it("shows trailing range without last ellipsis", () => {
      expect(buildPageItems(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
    });
  });
});
