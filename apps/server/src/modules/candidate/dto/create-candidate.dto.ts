import { z } from "zod";

export const createCandidateValidator = z.object({
  name: z.string().min(3),
  birthDate: z.string().date(),
  title: z.string().optional(),
  description: z.string(),
  password: z.string(),
  phoneNumber: z.number(),
  experience: z.array(z.object({
    roleName: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date().optional(),
    description: z.string()
  })),
  education: z.array(z.object({
    courseName: z.string(),
    instituition: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date()
  }))
})

export type CreateCandidateDto = z.infer<typeof createCandidateValidator>
