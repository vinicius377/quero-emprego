import { z } from "zod";

export const createCandidateValidator = z.object({
  name: z
    .string({ required_error: "Obrigatório" })
    .min(3, { message: "Deve ter pelo menos 3 digitos" }),
  birthDate: z.coerce.date({ message: "Deve ser uma data" }),
  password: z.string(),
  phoneNumber: z.preprocess(
    (x) => parseInt(x as string),
    z.number({ required_error: "Obrigatório", message: "Deve ser só números" }),
  ),
});
