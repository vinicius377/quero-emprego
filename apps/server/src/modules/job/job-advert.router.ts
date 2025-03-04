import { publicProcedure } from "#libs/trpc";
import { createJobAdvertValidator } from "./dto/create-job-advert.dto";
import { jobAdvertService } from "./job-advert.service";

export const jobAdvert = {
  create: publicProcedure
    .input(createJobAdvertValidator)
    .mutation(({ input }) => jobAdvertService.create(input)),
};
