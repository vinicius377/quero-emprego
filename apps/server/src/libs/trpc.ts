import { initTRPC } from "@trpc/server"
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"

export async function createContext({ req, res}: CreateHTTPContextOptions) {

  return {
    req,
    res
  }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

