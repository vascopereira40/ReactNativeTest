import {
  getCategoryTree,
  getHighlightContent,
  setCategoryFailure,
  setHighlightFailure,
} from "../src/api/mockApi";

describe("mockApi", () => {
  beforeEach(() => {
    // always reset flags between tests
    setCategoryFailure(false);
    setHighlightFailure(false);
  });

  test("getCategoryTree returns categories and brands on success", async () => {
    const result = await getCategoryTree();

    expect(result.categories.length).toBeGreaterThanOrEqual(1);
    expect(result.brands).toBeDefined();
    expect(result.brands.id).toBe("brands-root");
  });

  test("getCategoryTree throws when failure flag is enabled", async () => {
    setCategoryFailure(true);

    await expect(getCategoryTree()).rejects.toThrow(
      "Failed to fetch categories"
    );
  });

  test("getHighlightContent returns highlight cards on success", async () => {
    const result = await getHighlightContent();

    // your mock data has exactly 4 cards
    expect(result.length).toBe(4);
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("route");
  });

  test("getHighlightContent throws when failure flag is enabled", async () => {
    setHighlightFailure(true);

    await expect(getHighlightContent()).rejects.toThrow(
      "Failed to fetch highlight content"
    );
  });
});
