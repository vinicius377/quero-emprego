import { candidateProcedure } from "../../libs/trpc";
import { applyJobValidator } from "./dto/apply-job.dto";
import { jobApplicationService } from "./job-application.service";

export const jobApplication = {
  apply: candidateProcedure
    .input(applyJobValidator)
    .mutation(({ ctx, input }) =>
      jobApplicationService.apply(input, ctx.user.id),
    ),
};
