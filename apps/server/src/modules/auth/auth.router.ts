import { serialize } from "cookie";
import { publicProcedure } from "../../libs/trpc";
import { authService } from "./auth.service";
import { loginValidator } from '@packages/validators/auth/login'

export const auth = {
  businessLogin: publicProcedure
    .input(loginValidator)
    .mutation(async ({ input, ctx: { res } }) => {
      const { token, payload } = await authService.businessLogin(input);
      res.setHeader(
        "set-cookie",
        serialize("auth", token, {
          httpOnly: true,
          expires: payload.expires,
          secure: true,
        }),
      );

      return payload;
    }),
  candidateLogin: publicProcedure
    .input(loginValidator)
    .mutation(async ({ input, ctx: { res } }) => {
      const { token, payload } = await authService.candidateLogin(input);
      res.setHeader(
        "set-cookie",
        serialize("auth", token, {
          httpOnly: true,
          expires: payload.expires,
          secure: true,
        }),
      );

      return payload;
    }),
  signOut: publicProcedure.mutation(({ ctx: { res } }) => {
    res.setHeader("set-cookie", serialize("auth", ""));
  }),
};
