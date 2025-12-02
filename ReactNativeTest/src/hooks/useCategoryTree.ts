import { useQuery } from "@tanstack/react-query";
import { getCategoryTree } from "../api/mockApi";
import { CategoryTreeResponse } from "../types/categories";

const CATEGORY_TREE_QUERY_KEY = ["categoryTree"];

export const useCategoryTree = () => {
  const query = useQuery<CategoryTreeResponse, Error>({
    queryKey: CATEGORY_TREE_QUERY_KEY,
    queryFn: getCategoryTree,
    staleTime: 1000 * 60, // keep fresh for 1 min
    gcTime: 1000 * 60 * 5,
  });

  // Required: show cached-data banner if request fails but cached data exists
  const isUsingCache = query.isError && !!query.data;

  return {
    ...query,
    isUsingCache,
  };
};
