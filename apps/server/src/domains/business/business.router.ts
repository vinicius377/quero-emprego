import { z } from "zod";
import { publicProcedure } from "../../libs/trpc";
import { businessService } from "./business.service";
import { createBusinessValidator } from "./dto/create-business.dto";

const business = {
  create: publicProcedure
    .input(createBusinessValidator)
    .mutation(({ input }) => businessService.create(input)),
  getById: publicProcedure
    .input(z.string())
    .query(({ input: id }) => businessService.getById(id)),
};

export { business };
