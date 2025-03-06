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
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
