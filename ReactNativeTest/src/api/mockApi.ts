import { delay } from "../utils/delay";
import { HighlightCard } from "../types/highlights";
import {
  CategoryNode,
  BrandsNode,
  CategoryTreeResponse,
} from "../types/categories";

// --- Failure flags (can be toggled in tests / dev) ---
const shouldFailHighlights = false;
const shouldFailCategories = false;

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
      route: { screen: "CLP", params: { id: "cat-electronics" } },
      children: [
        {
          id: "cat-phones",
          name: "Phones",
          image: "https://via.placeholder.com/200",
          route: { screen: "CLP", params: { id: "cat-phones" } },
          children: [
            {
              id: "cat-smartphones",
              name: "Smartphones",
              image: "https://via.placeholder.com/200",
              route: { screen: "PLP", params: { id: "cat-smartphones" } },
              children: [],
            },
            {
              id: "cat-featurephones",
              name: "Feature Phones",
              image: "https://via.placeholder.com/200",
              route: { screen: "PLP", params: { id: "cat-featurephones" } },
              children: [],
            },
          ],
        },
      ],
    },

    {
      id: "cat-fashion",
      name: "Fashion",
      image: "https://via.placeholder.com/200",
      route: { screen: "CLP", params: { id: "cat-fashion" } },
      children: [
        {
          id: "cat-men",
          name: "Men",
          image: "https://via.placeholder.com/200",
          route: { screen: "CLP", params: { id: "cat-men" } },
          children: [
            {
              id: "cat-men-shirts",
              name: "Shirts",
              image: "https://via.placeholder.com/200",
              route: { screen: "PLP", params: { id: "cat-men-shirts" } },
              children: [],
            },
          ],
        },
      ],
    },

    {
      id: "cat-home",
      name: "Home & Kitchen",
      image: "https://via.placeholder.com/200",
      route: { screen: "CLP", params: { id: "cat-home" } },
      children: [
        {
          id: "cat-cookware",
          name: "Cookware",
          image: "https://via.placeholder.com/200",
          route: { screen: "PLP", params: { id: "cat-cookware" } },
          children: [],
        },
      ],
    },

    {
      id: "cat-sports",
      name: "Sports",
      image: "https://via.placeholder.com/200",
      route: { screen: "CLP", params: { id: "cat-sports" } },
      children: [
        {
          id: "cat-outdoor",
          name: "Outdoor",
          image: "https://via.placeholder.com/200",
          route: { screen: "PLP", params: { id: "cat-outdoor" } },
          children: [],
        },
      ],
    },

    {
      id: "cat-books",
      name: "Books",
      image: "https://via.placeholder.com/200",
      route: { screen: "PLP", params: { id: "cat-books" } },
      children: [],
    },

    {
      id: "cat-beauty",
      name: "Beauty",
      image: "https://via.placeholder.com/200",
      route: { screen: "PLP", params: { id: "cat-beauty" } },
      children: [],
    },

    {
      id: "cat-grocery",
      name: "Grocery",
      image: "https://via.placeholder.com/200",
      route: { screen: "PLP", params: { id: "cat-grocery" } },
      children: [],
    },

    {
      id: "cat-toys",
      name: "Toys",
      image: "https://via.placeholder.com/200",
      route: { screen: "CLP", params: { id: "cat-toys" } },
      children: [
        {
          id: "cat-learning",
          name: "Learning Toys",
          image: "https://via.placeholder.com/200",
          route: { screen: "PLP", params: { id: "cat-learning" } },
          children: [],
        },
      ],
    },
  ],
  brands: {
    id: "brands-root",
    name: "Brands",
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
