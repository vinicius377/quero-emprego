import { authUserMiddleware } from "#middleware/auth.middleware";
import { getUser } from "#utils/getUser";
import { Role } from "#utils/role";
import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { ZodError } from "zod";
import superjson from "superjson"

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  return {
    req,
    res,
  };
}

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson
});

export const router = t.router;
export const publicProcedure = t.procedure.use(async (opts) => {
  const user = await getUser(opts.ctx.req);

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const businessProcedure = publicProcedure.use(async (opts) => {
  const user = await authUserMiddleware(Role.business, opts.ctx.req);

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const candidateProcedure = publicProcedure.use(async (opts) => {
  const user = await authUserMiddleware(Role.candidate, opts.ctx.req);

  return opts.next({
    ctx: {
      user,
    },
  });
});
