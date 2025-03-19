import { z } from "zod";

export const createBusinessValidator = z.object({
  cnpj: z.preprocess(
    (x) => parseInt(x as string),
    z.number({ message: "Deve ser só números", required_error: "Obrigatório" }).refine((x) => String(x).length === 14, { message: "Deve ter 14 digitos" }),
  ),
  businessName: z.string({ required_error: "Obrigatório" }).min(5, { message: "Deve ter pelo menos 5 digitos" }),
  responsableName: z.string({ required_error: "Obrigatório" }).min(5, { message: "Deve ter pelo menos 5 digitos" }),
  phoneNumber: z.preprocess(
    (x) => parseInt(x as string),
    z.number({ required_error: "Obrigatório", message: "Deve ser só números" }).refine((x) => {
      const length = String(x).length;
      return length >= 10 || length === 11;
    }, "Deve ter 10 ou 11 números"),
  ),
  password: z.string({ required_error: "Obrigatório" }).min(4, { message: "Deve ter pelo menos 4 digitos" }),
  location: z.object({
    city: z.string({ required_error: "Obrigatório" }),
    address: z.string({ required_error: "Obrigatório" }),
    postalCode: z.preprocess((x) => parseInt(x as string), z.number({ message: "Deve ser só numeros", required_error: "Obrigatório" })),
    neighborhood: z.string({ required_error: "Obrigatório" }),
    number: z.preprocess((x) => parseInt(x as string), z.number({ message: "Deve ser só numeros", required_error: "Obrigatório" })),
    state: z.string({ required_error: "Obrigatório" }),
  }),
});
