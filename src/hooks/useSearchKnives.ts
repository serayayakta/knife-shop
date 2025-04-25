import { useQuery } from "@tanstack/react-query";
import { searchKnives } from "@/services/knife";

export function useSearchKnives(params: {
  searchTerm?: string;
  categoryId?: string;
}) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => searchKnives(params),
    staleTime: 1000 * 30, // 30 sec
  });
}
