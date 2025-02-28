import { publicProcedure } from "../../libs/trpc";
import { authService } from "./auth.service";
import { loginValidator } from "./validators/login.validator";

export const auth = {
  businessLogin: publicProcedure
    .input(loginValidator)
    .mutation(({ input }) => authService.businessLogin(input)),
};
