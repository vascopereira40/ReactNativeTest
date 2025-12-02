import React from "react";
import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import { CategoryEntryScreen } from "../src/screens/CategoryEntryScreen";
import { useHighlights } from "../src/hooks/useHighlights";
import { useCategoryTree } from "../src/hooks/useCategoryTree";
import { CategoryTreeResponse } from "../src/types/categories";
import { HighlightCard } from "../src/types/highlights";

jest.mock("@expo/vector-icons/Octicons", () => {
  const React = require("react");
  return (props: any) => React.createElement("Icon", props);
});

jest.mock("../src/hooks/useHighlights");
jest.mock("../src/hooks/useCategoryTree");

const mockedUseHighlights = useHighlights as jest.Mock;
const mockedUseCategoryTree = useCategoryTree as jest.Mock;

const renderWithNavigation = (ui: React.ReactElement) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

describe("CategoryEntryScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading skeletons when data is loading", () => {
    mockedUseHighlights.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isUsingCache: false,
    });

    mockedUseCategoryTree.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isUsingCache: false,
    });

    renderWithNavigation(<CategoryEntryScreen />);

    // search bar is still visible
    expect(screen.getByPlaceholderText(/search categories/i)).toBeTruthy();

    // skeletons should be visible
    expect(screen.getByTestId("highlight-skeleton")).toBeTruthy();
    expect(screen.getAllByTestId("category-skeleton").length).toBeGreaterThan(
      0
    );
    expect(screen.getByTestId("brands-skeleton")).toBeTruthy();
  });

  test("renders highlights, categories and brands when data is loaded", () => {
    const mockHighlights: HighlightCard[] = [
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
          params: { id: "cat-fashion" },
        },
      },
      {
        id: "h3",
        title: "Top Brands",
        image: "https://via.placeholder.com/150",
        route: {
          src: "EXTERNAL",
          url: "https://example.com",
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
            screen: "CLP",
            params: { id: "cat-electronics" },
          },
          children: [],
        },
        {
          id: "cat-fashion",
          name: "Fashion",
          image: "https://via.placeholder.com/200",
          route: {
            screen: "CLP",
            params: { id: "cat-fashion" },
          },
          children: [],
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

    mockedUseHighlights.mockReturnValue({
      data: mockHighlights,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isUsingCache: false,
    });

    mockedUseCategoryTree.mockReturnValue({
      data: mockCategoryTree,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isUsingCache: false,
    });

    renderWithNavigation(<CategoryEntryScreen />);

    // search bar visible
    expect(screen.getByPlaceholderText(/search categories/i)).toBeTruthy();

    // highlight section title
    expect(screen.getByText(/highlights/i)).toBeTruthy();

    // one of the highlight titles
    expect(screen.getByText("Summer Deals")).toBeTruthy();

    // categories rendered
    expect(screen.getByText("Electronics")).toBeTruthy();
    expect(screen.getByText("Fashion")).toBeTruthy();

    // brands row rendered
    expect(screen.getByText("Brands")).toBeTruthy();
  });
});
