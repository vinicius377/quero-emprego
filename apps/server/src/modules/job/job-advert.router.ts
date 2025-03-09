import { paginationValidator } from "#utils/pagination";
import { z } from "zod";
import { businessProcedure, publicProcedure } from "../../libs/trpc";
import { createJobAdvertValidator } from "./dto/create-job-advert.dto";
import { jobAdvertService } from "./job-advert.service";
import { createBusinessValidator } from "#modules/business/dto/create-business.dto";

const list = createJobAdvertValidator.extend({
  business: createBusinessValidator 
})

export const jobAdvert = {
  create: businessProcedure
    .input(createJobAdvertValidator)
    .mutation(({ input, ctx }) =>
      jobAdvertService.create(input, ctx.user?.id || ""),
    ),
  list: publicProcedure
    .input(paginationValidator)
    .query(({ input, ctx }) => jobAdvertService.list(input, ctx.user)),
};

