import { z } from "zod";
import { updateCandidateValidator } from "@packages/validators/candidate/update-candidate";

export type UpdateCandidateDto = z.infer<typeof updateCandidateValidator>;
