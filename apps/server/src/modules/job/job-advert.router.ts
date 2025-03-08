import { businessProcedure } from "../../libs/trpc";
import { createJobAdvertValidator } from "./dto/create-job-advert.dto";
import { jobAdvertService } from "./job-advert.service";

export const jobAdvert = {
  create: businessProcedure 
    .input(createJobAdvertValidator)
    .mutation(({ input, ctx }) => jobAdvertService.create(input, ctx.user?.id || "")),
};
