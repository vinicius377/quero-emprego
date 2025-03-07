import { z } from "zod";

export const createBusinessValidator = z.object({
  cnpj: z.preprocess(
    (x) => parseInt(x as string),
    z.number().refine((x) => String(x).length === 14),
  ),
  businessName: z.string().min(5),
  responsableName: z.string().min(5),
  phoneNumber: z.preprocess(
    (x) => parseInt(x as string),
    z.number().refine((x) => {
      const length = String(x).length;
      return length >= 10 || length === 11;
    }, "Deve ter 10 ou 11 números"),
  ),
  password: z.string().min(4),
  location: z.object({
    city: z.string(),
    address: z.string(),
    postalCode: z.preprocess((x) => parseInt(x as string), z.number()),
    neighborhood: z.string(),
    number: z.preprocess((x) => parseInt(x as string), z.number()),
    state: z.string(),
  }),
});

export type CreateBusinessDto = z.infer<typeof createBusinessValidator>;
