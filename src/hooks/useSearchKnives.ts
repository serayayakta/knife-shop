import { useQuery } from "@tanstack/react-query";
import { fetchKnives, searchKnives, Knife } from "@/services/knife";

export function useSearchKnives(params: {
  searchTerm?: string;
  categoryId?: string;
}) {
  const shouldSearch = params.searchTerm?.trim() || params.categoryId?.trim();

  return useQuery<Knife[]>({
    queryKey: ["searchKnives", params],
    queryFn: () =>
      shouldSearch
        ? searchKnives({
            ...params,
            page: 1,
            size: 100,
          })
        : fetchKnives(),
    staleTime: 1000 * 30,
  });
}
