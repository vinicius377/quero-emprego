import { publicProcedure } from "../../trpc";
import { businessService } from "./business.service";
import { createBusinessValidation } from "./validations/business.validation";

const business = {
  createBusiness: publicProcedure
    .input(createBusinessValidation)
    .mutation(({ input }) => businessService.createBusiness(input)),
};

export { business };
