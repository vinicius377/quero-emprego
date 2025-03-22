import { paginationValidator } from "#utils/pagination";
import { z } from "zod";
import { businessProcedure, publicProcedure } from "../../libs/trpc";
import { createJobAdvertValidator } from "@packages/validators/job/create-job-advert";
import { jobAdvertService } from "./job-advert.service";
import { updateJobAdvertValidator } from "@packages/validators/job/update-job-advert";

export const jobAdvert = {
  create: businessProcedure
    .input(createJobAdvertValidator)
    .mutation(({ input, ctx }) =>
      jobAdvertService.create(input, ctx.user?.id || "")
    ),
  list: publicProcedure
    .input(paginationValidator)
    .query(({ input, ctx }) => jobAdvertService.list(input, ctx.user)),
  listByBusiness: businessProcedure
    .input(paginationValidator)
    .query(({ input, ctx }) =>
      jobAdvertService.listByBusiness(input, ctx.user.id)
    ),
  getById: businessProcedure
    .input(z.string())
    .query(({ input }) => jobAdvertService.getById(input)),
  edit: businessProcedure
    .input(updateJobAdvertValidator)
    .mutation(({ input, ctx }) => jobAdvertService.edit(input, ctx.user.id)),
};
