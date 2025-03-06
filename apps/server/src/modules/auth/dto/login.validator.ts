import { z } from "zod";

export const loginValidator = z.object({
  phoneNumber: z.preprocess(
    (x) => parseInt(x as string),
    z.number().min(999999999).max(99999999999),
  ),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginValidator>;
