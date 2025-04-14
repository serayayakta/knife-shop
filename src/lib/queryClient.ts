import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// This is the default configuration for the query client.
// You can customize it further by passing options to the QueryClient constructor.
// For example, you can set default query options, mutation options, etc.
// You can also set global query options using the `setDefaultOptions` method.
// For more information, check the official documentation:
// https://tanstack.com/query/v4/docs/react/overview
// https://tanstack.com/query/v4/docs/react/reference/QueryClient
