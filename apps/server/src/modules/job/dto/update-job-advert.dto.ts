import { updateJobAdvertValidator } from "@packages/validators/job/update-job-advert";
import { z } from "zod";

export type UpdateJobAdvertDto = z.infer<typeof updateJobAdvertValidator>;
