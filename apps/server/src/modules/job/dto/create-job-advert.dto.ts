import { z } from "zod";

export const createJobAdvertValidator = z.object({
  title: z.string(),
  description: z.string(),
  remuneration: z.number().min(1).optional()
})

export type createJobAdvertDto = z.infer<typeof createJobAdvertValidator>
