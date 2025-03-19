import { z } from "zod";

export const createJobAdvertValidator = z.object({
  title: z.string({ required_error: "Obrigatório" }).min(1, { message: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }),
  remuneration: z.preprocess((x) => Number(x), z.number({ message: "Deve ser só números" }).min(1, { message: "Mínimo de R$ 1,00" }).optional()),
});


