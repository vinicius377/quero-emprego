import { z } from "zod"

export const loginValidator = z.object({
  phoneNumber: z.number().min(10).max(11),
  password: z.string()
})

export type LoginDto = z.infer<typeof loginValidator>
