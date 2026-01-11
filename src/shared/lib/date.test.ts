import { formatDate } from "./date";

describe("formatDate", () => {
  it("formats Date to DD.MM.YYYY", () => {
    const date = new Date(2025, 11, 12);
    expect(formatDate(date)).toBe("12.12.2025");
  });

  it("formats ISO string to DD.MM.YYYY", () => {
    expect(formatDate("2023-12-25")).toBe("25.12.2023");
  });
  it("returns empty string for invalid input", () => {
    expect(formatDate("not-a-date")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(formatDate()).toBe("");
    expect(formatDate(null)).toBe("");
  });
});
