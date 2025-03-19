import { z } from "zod";
import { createJobAdvertValidator } from "@packages/validators/job/create-job-advert"

export type CreateJobAdvertDto = z.infer<typeof createJobAdvertValidator>;
