import { z } from "zod";
import { publicProcedure } from "../../libs/trpc";
import { businessService } from "./business.service";
import { createBusinessValidation } from "./validations/business.validation";

const business = {
  create: publicProcedure
    .input(createBusinessValidation)
    .mutation(({ input }) => businessService.create(input)),
  getById: publicProcedure.input(z.string()).query(({ input: id }) => businessService.getById(id)) 
};

export { business };
