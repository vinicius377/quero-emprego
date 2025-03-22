import { authUserMiddleware } from "#middleware/auth.middleware";
import { getUser } from "#utils/getUser";
import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { ZodError } from "zod";
import superjson from "superjson";
import { Role } from "@packages/types/enums";

export async function createContext({ req, res }: CreateHTTPContextOptions) {
  return {
    req,
    res,
  };
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter: (opts) => {
    const { shape, error } = opts;
    const isZodError =
      error.code === "BAD_REQUEST" && error.cause instanceof ZodError;

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: isZodError ? error.cause.flatten() : null,
      },
      message: isZodError
        ? "Alguns campos não estão preenchidos corretamente"
        : shape.message,
    };
  },
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
