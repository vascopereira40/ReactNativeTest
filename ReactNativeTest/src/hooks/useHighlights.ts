import { useQuery } from "@tanstack/react-query";
import { getHighlightContent } from "../api/mockApi";
import { HighlightCard } from "../types/highlights";

const HIGHLIGHTS_QUERY_KEY = ["highlights"];

export const useHighlights = () => {
  const query = useQuery<HighlightCard[], Error>({
    queryKey: HIGHLIGHTS_QUERY_KEY,
    queryFn: getHighlightContent,
    staleTime: 1000 * 60, // 1 minute caching
    gcTime: 1000 * 60 * 5,
  });

  // Required: show cached-data banner if request fails but cached data exists
  const isUsingCache = query.isError && !!query.data;

  return {
    ...query,
    isUsingCache,
  };
};
