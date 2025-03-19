import { publicProcedure } from "../../libs/trpc";
import { candidateService } from "./candidate.service";
import { createCandidateValidator } from "@packages/validators/candidate/create-candidate"

export const candidate = {
  create: publicProcedure
    .input(createCandidateValidator)
    .mutation(({ input }) => candidateService.create(input)),
 };
