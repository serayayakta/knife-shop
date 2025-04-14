"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
// This component wraps the application with the React Query Client Provider.
// It provides the query client to all components in the application.
// This allows components to use React Query hooks to fetch and manage data.
// The query client is created in the `lib/queryClient.ts` file.
// The `queryClient` is passed to the `QueryClientProvider` component.
// The `children` prop is the content of the application.
// The `ReactQueryClientProvider` component is used in the `layout.tsx` file.
// It wraps the entire application with the query client provider.
// This allows all components in the application to use React Query hooks.
