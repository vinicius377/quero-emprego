import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "@packages/trpc"
import superjson from "superjson"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3333",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include"
        })
      },
      transformer: superjson
    })
  ],
})

