import { paginationValidator } from "#utils/pagination";
import { z } from "zod";
import { businessProcedure, publicProcedure } from "../../libs/trpc";
import { createJobAdvertValidator } from "@packages/validators/job/create-job-advert"
import { jobAdvertService } from "./job-advert.service";
import { StatusJob } from "@packages/types/enums/index";

const x = z.object({
  id: z.string(),
  status: z.nativeEnum(StatusJob)
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
  listByBusiness: businessProcedure
    .input(paginationValidator)
    .query(({ input, ctx }) =>
      jobAdvertService.listByBusiness(input, ctx.user.id),
    ),
  getById: businessProcedure
    .input(z.string())
    .query(({ input }) => jobAdvertService.getById(input)),
  changeStatus: businessProcedure
    .input(x)
    .mutation(({ ctx, input }) => jobAdvertService.changeStatus(input, ctx.user.id))
};
