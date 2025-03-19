import { z } from "zod";

export const createCandidateValidator = z.object({
  name: z.string({ required_error: "Obrigatório" }).min(3, { message: "Deve ter pelo menos 3 digitos" }),
  birthDate: z.coerce.date({ message: "Deve ser uma data" }),
  title: z.string().optional(),
  description: z.string().optional(),
  password: z.string(),
  phoneNumber: z.preprocess((x) => parseInt(x as string), z.number({ required_error: "Obrigatório", message: "Deve ser só números" })),
  experience: z
    .array(
      z.object({
        roleName: z.string({ required_error: "Obrigatório" }),
        startDate: z.coerce.date({ message: "Deve ser uma data", required_error: "Obrigatório" }),
        endDate: z.coerce.date({ message: "Deve ser uma data" }).optional(),
        description: z.string({ required_error: "Obrigatório" }),
      }),
    )
    .optional(),
  education: z
    .array(
      z.object({
        courseName: z.string({ required_error: "Obrigatório" }),
        instituition: z.string({ required_error: "Obrigatório " }),
        startDate: z.coerce.date({ message: "Deve ser uma data" }),
        endDate: z.coerce.date({ message: "Deve ser uma data" }),

      }),
    )
    .optional(),
});

