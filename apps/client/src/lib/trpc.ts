import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from "@packages/trpc"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3333"
    })
  ]
})

