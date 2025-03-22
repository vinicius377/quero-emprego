import { z } from "zod";
import { StatusJob } from "@packages/types/enums";

export const updateJobAdvertValidator = z.object({
  title: z.string().min(1, { message: "Obrigatório" }),
  description: z.string(),
  remuneration: z.preprocess(
    (x) => Number(x),
    z
      .number({ message: "Deve ser só números" })
      .min(1, { message: "Mínimo de R$ 1,00" })
  ),
  id: z.string(),
  status: z.nativeEnum(StatusJob),
});
