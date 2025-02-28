import { initTRPC } from "@trpc/server"

export async function createContext() {

  return {
    a: "1"
  }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
