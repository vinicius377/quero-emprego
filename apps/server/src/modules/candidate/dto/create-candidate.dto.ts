import { z } from "zod";
import { createCandidateValidator } from "@packages/validators/candidate/create-candidate";

export type CreateCandidateDto = z.infer<typeof createCandidateValidator>;
