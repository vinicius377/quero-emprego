import { z } from "zod";

export const createCandidateValidator = z.object({
  cpf: z.number().min(99999999999).max(99999999999),
  birthDate: z.string().date(),
  name: z.string().min(3),
  title: z.string().optional(),
  description: z.string(),
  experience: z.array(z.object({
    roleName: z.string(),
    startDate: z. string().date(),
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
