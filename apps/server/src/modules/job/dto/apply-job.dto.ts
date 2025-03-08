import { z } from "zod";

export const applyJobValidator = z.object({
  jobAdvertId: z.string()
})

export type ApplyJobDto = z.infer<typeof applyJobValidator>
