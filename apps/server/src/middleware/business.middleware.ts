import { publicProcedure } from "#libs/trpc";
import { authUser } from "#utils/authUser";
import { Role } from "#utils/role";

export const businessMiddleware = publicProcedure.use(async (opts) => {
  const user = await authUser(Role.business, opts.ctx.req)

  return opts.next({
      ctx: {
        user
      }
  })
})
