import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/knife";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
