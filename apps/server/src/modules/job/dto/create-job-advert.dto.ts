import { z } from "zod";

export const createJobAdvertValidator = z.object({
  title: z.string(),
  description: z.string(),
  remuneration: z.preprocess((x) => Number(x), z.number().min(1).optional()),
});

export type CreateJobAdvertDto = z.infer<typeof createJobAdvertValidator>;
