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
        screen: "CLP", // parent → CLP
        params: { id: "cat-electronics" },
      },
      children: [
        {
          id: "cat-phones",
          name: "Phones",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "CLP", // mid-level → CLP
            params: { id: "cat-phones" },
          },
          children: [
            {
              id: "cat-smartphones",
              name: "Smartphones",
              image: "https://via.placeholder.com/200",
              route: {
                screen: "PLP", // leaf → PLP
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
        screen: "CLP",
        params: { id: "cat-clothing" },
      },
      children: [
        {
          id: "cat-men",
          name: "Men",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "PLP", // leaf
            params: { id: "cat-men" },
          },
          children: [],
        },
      ],
    },
    {
      id: "cat-music",
      name: "Music",
      image: "https://via.placeholder.com/200",
      route: {
        screen: "CLP",
        params: { id: "cat-music" },
      },
      children: [
        {
          id: "cat-instruments",
          name: "Instruments",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "PLP", // could be CLP if you add more depth
            params: { id: "cat-instruments" },
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
const API_DELAY_MS_cATEGORY = 1500; 
const API_DELAY_MS_HIGHLIGHT = 2000;

export const getHighlightContent = async (): Promise<HighlightCard[]> => {
  await delay(API_DELAY_MS_HIGHLIGHT);

  if (shouldFailHighlights) {
    throw new Error("Failed to fetch highlight content");
  }

  // you can change length here for testing the "exactly 4 cards" rule
  return mockHighlightCards;
};

export const getCategoryTree = async (): Promise<CategoryTreeResponse> => {
  await delay(API_DELAY_MS_cATEGORY);

  if (shouldFailCategories) {
    throw new Error("Failed to fetch categories");
  }

  return mockCategoryTree;
};
