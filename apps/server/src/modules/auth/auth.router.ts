import { publicProcedure } from "../../libs/trpc";
import { authService } from "./auth.service";
import { loginValidator } from "./dto/login.validator";

export const auth = {
  businessLogin: publicProcedure
    .input(loginValidator)
    .mutation(({ input }) => authService.businessLogin(input)),
  candidateLogin: publicProcedure
    .input(loginValidator)
    .mutation(({ input }) => authService.candidateLogin(input)),
};
