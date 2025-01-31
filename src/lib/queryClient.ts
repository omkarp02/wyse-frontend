import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10000,
          retry: 0,
        },
      },
    })
);
export default getQueryClient;
