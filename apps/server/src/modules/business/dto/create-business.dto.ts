import { z } from "zod";
import { createBusinessValidator } from "@packages/validators/business/create-business";

export type CreateBusinessDto = z.infer<typeof createBusinessValidator>;
