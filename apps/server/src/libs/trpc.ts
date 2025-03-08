import { authUserMiddleware } from "#middleware/auth.middleware";
import { Role } from "#utils/role";
import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { ZodError } from "zod";

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  return {
    req,
    res,
  };
}

const t = initTRPC.context<typeof createContext>().create({
  errorFormatter: (opts) => {
    const { shape, error } = opts;
    return {
      message: shape.message,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

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
