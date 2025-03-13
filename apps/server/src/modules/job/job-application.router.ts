import { paginationValidator } from "#utils/pagination";
import { z } from "zod";
import { businessProcedure, candidateProcedure } from "../../libs/trpc";
import { applyJobValidator } from "./dto/apply-job.dto";
import { jobApplicationService } from "./job-application.service";

export const jobApplication = {
  apply: candidateProcedure
    .input(applyJobValidator)
    .mutation(({ ctx, input }) =>
      jobApplicationService.apply(input, ctx.user.id),
    ),
  listByCandidate: candidateProcedure
    .input(paginationValidator)
    .query(({ ctx }) => jobApplicationService.listByCandidate(ctx.user.id)),
  listByJobAdvert: businessProcedure
    .input(z.string())
    .query(({ input }) =>
      jobApplicationService.listByJobAdvert(input),
    ),
};
