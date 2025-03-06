import { setCookie } from "#utils/cookie";
import { publicProcedure } from "../../libs/trpc";
import { authService } from "./auth.service";
import { loginValidator } from "./dto/login.validator";

export const auth = {
  businessLogin: publicProcedure
    .input(loginValidator)
    .mutation(async ({ input, ctx: { res } }) => {
      const { token, payload } = await authService.businessLogin(input);
      setCookie(res.setHeader, "auth", token, { httpOnly: true });

      return payload;
    }),
  candidateLogin: publicProcedure
    .input(loginValidator)
    .mutation(({ input }) => authService.candidateLogin(input)),
};
