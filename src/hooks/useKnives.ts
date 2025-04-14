import { useQuery } from "@tanstack/react-query";
import { fetchKnives } from "@/services/knife";

export function useKnives() {
  return useQuery({
    queryKey: ["knives"],
    queryFn: fetchKnives,
    staleTime: 1000 * 60, // 1 min freshness
  });
}
