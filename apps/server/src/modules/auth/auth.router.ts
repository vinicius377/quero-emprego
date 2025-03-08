import { serialize } from "cookie";
import { publicProcedure } from "../../libs/trpc";
import { authService } from "./auth.service";
import { loginValidator } from "./dto/login.validator";

export const auth = {
  businessLogin: publicProcedure
    .input(loginValidator)
    .mutation(async ({ input, ctx: { res } }) => {
      const { token, payload, expires } =
        await authService.businessLogin(input);
      res.setHeader(
        "set-cookie",
        serialize("auth", token, { httpOnly: true, expires }),
      );

      return payload;
    }),
  candidateLogin: publicProcedure
    .input(loginValidator)
    .mutation(async ({ input, ctx: { res } }) => {
      const { token, payload, expires } =
        await authService.candidateLogin(input);
      res.setHeader(
        "set-cookie",
        serialize("auth", token, { httpOnly: true, expires }),
      );

      return payload;
    }),
  signOut: publicProcedure.mutation(({ ctx: { res } }) => {
    res.setHeader("set-cookie", serialize("auth", ""));
  }),
};
