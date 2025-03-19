import { z } from "zod";

export const loginValidator = z.object({
  phoneNumber: z.preprocess(
    (x) => parseInt(x as string),
    z.number({ message: "Deve ser só numeros", required_error: "Obrigatório" }).min(999999999, { message: "Mínimo de 10 digitos" }).max(99999999999, { message: "Máximo de 11 digitos" }),
  ),
  password: z.string({ required_error: 'Obrigatório' }),
});
