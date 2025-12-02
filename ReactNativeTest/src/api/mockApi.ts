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
    title: "Christmas Deals",
    image:
      "https://cdn.pixabay.com/photo/2021/12/30/22/08/presents-6904620_1280.jpg",
    route: {
      src: "INTERNAL",
      screen: "PLP",
      params: { id: "cat-electronics" },
    },
  },
  {
    id: "h2",
    title: "New Arrivals",
    image:
      "https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg",
    route: {
      src: "INTERNAL",
      screen: "CLP",
      params: { id: "cat-clothing" },
    },
  },
  {
    id: "h3",
    title: "Top Brands",
    image:
      "https://cdn.pixabay.com/photo/2018/01/15/03/01/feedback-3083100_1280.jpg",
    route: {
      src: "EXTERNAL",
      url: "https://www.capgemini.com/pt-en/about-us/capgemini-portugal/",
    },
  },
  {
    id: "h4",
    title: "For your home",
    image:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
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
      name: "Smartphones and Smartwatches",
      image:
        "https://cdn.pixabay.com/photo/2015/11/03/18/41/iphone-1021297_1280.jpg",
      route: { screen: "CLP", params: { id: "cat-electronics" } },
      children: [
        {
          id: "cat-smartphones",
          name: "Smartphones",
          image:
            "https://cdn.pixabay.com/photo/2020/01/15/06/37/black-4766998_1280.jpg",
          route: { screen: "CLP", params: { id: "cat-smartphones" } },
          children: [
            {
              id: "cat-samsung",
              name: "Samsung",
              image:
                "https://cdn.pixabay.com/photo/2020/01/15/06/37/black-4766998_1280.jpg",
              route: { screen: "PLP", params: { id: "cat-samsung" } },
              children: [],
            },
            {
              id: "cat-iphone",
              name: "iPhone",
              image:
                "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg",
              route: { screen: "PLP", params: { id: "cat-iphone" } },
              children: [],
            },
          ],
        },
        {
          id: "cat-smartwatch",
          name: "Smartwatches",
          image:
            "https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg",
          route: { screen: "PLP", params: { id: "cat-smartwatch" } },
          children: [],
        },
      ],
    },

    {
      id: "cat-fashion",
      name: "Fashion",
      image:
        "https://cdn.pixabay.com/photo/2020/08/24/21/44/man-5515150_1280.jpg",
      route: { screen: "CLP", params: { id: "cat-fashion" } },
      children: [
        {
          id: "cat-men",
          name: "Men",
          image:
            "https://cdn.pixabay.com/photo/2020/08/24/21/44/man-5515150_1280.jpg",
          route: { screen: "CLP", params: { id: "cat-men" } },
          children: [
            {
              id: "cat-men-shirts",
              name: "Shirts",
              image:
                "https://cdn.pixabay.com/photo/2020/08/24/21/44/man-5515150_1280.jpg",
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
      image:
        "https://cdn.pixabay.com/photo/2014/08/11/21/26/kitchen-416027_1280.jpg",
      route: { screen: "CLP", params: { id: "cat-home" } },
      children: [
        {
          id: "cat-cookware",
          name: "Cookware",
          image:
            "https://cdn.pixabay.com/photo/2013/09/16/10/56/cookware-182788_1280.jpg",
          route: { screen: "PLP", params: { id: "cat-cookware" } },
          children: [],
        },
      ],
    },

    {
      id: "cat-sports",
      name: "Sports",
      image:
        "https://cdn.pixabay.com/photo/2014/10/22/18/04/man-498473_1280.jpg",
      route: { screen: "CLP", params: { id: "cat-sports" } },
      children: [
        {
          id: "cat-outdoor",
          name: "Outdoor",
          image:
            "https://cdn.pixabay.com/photo/2014/10/22/18/04/man-498473_1280.jpg",
          route: { screen: "PLP", params: { id: "cat-outdoor" } },
          children: [],
        },
      ],
    },

    {
      id: "cat-books",
      name: "Books",
      image:
        "https://cdn.pixabay.com/photo/2017/04/27/13/14/book-2265490_1280.jpg",
      route: { screen: "PLP", params: { id: "cat-books" } },
      children: [],
    },

    {
      id: "cat-toys",
      name: "Toys",
      image:
        "https://cdn.pixabay.com/photo/2019/04/14/20/05/duck-meet-4127713_1280.jpg",
      route: { screen: "CLP", params: { id: "cat-toys" } },
      children: [
        {
          id: "cat-learning",
          name: "Learning Toys",
          image:
            "https://cdn.pixabay.com/photo/2019/04/14/20/05/duck-meet-4127713_1280.jpg",
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
const API_DELAY_MS_cATEGORY = 800;
const API_DELAY_MS_HIGHLIGHT = 1200;

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
