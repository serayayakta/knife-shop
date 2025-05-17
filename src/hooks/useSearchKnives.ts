import { useQuery } from "@tanstack/react-query";
import { searchKnives, Knife } from "@/services/knife";

export function useSearchKnives(params: {
  searchTerm?: string;
  categoryId?: string;
  sortDirection?: "asc" | "desc";
}) {
  return useQuery<Knife[]>({
    queryKey: ["searchKnives", params],
    queryFn: () =>
      searchKnives({
        ...params,
        page: 1,
        size: 100,
      }),
    staleTime: 1000 * 30,
  });
}
