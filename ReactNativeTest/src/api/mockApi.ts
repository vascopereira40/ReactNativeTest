import { delay } from "../utils/delay";
import { HighlightCard } from "../types/highlights";
import {
  CategoryNode,
  BrandsNode,
  CategoryTreeResponse,
} from "../types/categories";

// --- Failure flags (can be toggled in tests / dev) ---
let shouldFailHighlights = false;
let shouldFailCategories = false;

export const setHighlightFailure = (value: boolean) => {
  shouldFailHighlights = value;
};

export const setCategoryFailure = (value: boolean) => {
  shouldFailCategories = value;
};

// --- Mock data ---

const mockHighlightCards: HighlightCard[] = [
  {
    id: "h1",
    title: "Summer Deals",
    image: "https://via.placeholder.com/150",
    route: {
      src: "INTERNAL",
      screen: "PLP",
      params: { id: "cat-electronics" },
    },
  },
  {
    id: "h2",
    title: "New Arrivals",
    image: "https://via.placeholder.com/150",
    route: {
      src: "INTERNAL",
      screen: "CLP",
      params: { id: "cat-clothing" },
    },
  },
  {
    id: "h3",
    title: "Top Brands",
    image: "https://via.placeholder.com/150",
    route: {
      src: "EXTERNAL",
      url: "https://example.com/top-brands",
    },
  },
  {
    id: "h4",
    title: "Trending Now",
    image: "https://via.placeholder.com/150",
    route: {
      src: "INTERNAL",
      screen: "PD",
      params: { id: "product-123" },
    },
  },
];

const mockCategoryTree: CategoryTreeResponse = {
  categories: [
    {
      id: "cat-electronics",
      name: "Electronics",
      image: "https://via.placeholder.com/200",
      route: {
        screen: "PLP",
        params: { id: "cat-electronics" },
      },
      children: [
        {
          id: "cat-phones",
          name: "Phones",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "CLP",
            params: { id: "cat-phones" },
          },
          children: [
            {
              id: "cat-smartphones",
              name: "Smartphones",
              image: "https://via.placeholder.com/200",
              route: {
                screen: "PLP",
                params: { id: "cat-smartphones" },
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "cat-clothing",
      name: "Clothing",
      image: "https://via.placeholder.com/200",
      route: {
        screen: "PLP",
        params: { id: "cat-clothing" },
      },
      children: [
        {
          id: "cat-men",
          name: "Men",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "CLP",
            params: { id: "cat-men" },
          },
          children: [],
        },
      ],
    },
  ],
  brands: {
    id: "brands-root",
    name: "Brands",
    image: "https://via.placeholder.com/200",
    route: {
      screen: "BRAND_LIST",
    },
  },
};

// --- Endpoints ---

const API_DELAY_MS = 800;

export const getHighlightContent = async (): Promise<HighlightCard[]> => {
  await delay(API_DELAY_MS);

  if (shouldFailHighlights) {
    throw new Error("Failed to fetch highlight content");
  }

  // you can change length here for testing the "exactly 4 cards" rule
  return mockHighlightCards;
};

export const getCategoryTree = async (): Promise<CategoryTreeResponse> => {
  await delay(API_DELAY_MS);

  if (shouldFailCategories) {
    throw new Error("Failed to fetch categories");
  }

  return mockCategoryTree;
};
