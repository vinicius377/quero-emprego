import { publicProcedure } from "../../libs/trpc";
import { candidateService } from "./candidate.service";
import { createCandidateValidator } from "./dto/create-candidate.dto";

export const candidate = {
  create: publicProcedure
    .input(createCandidateValidator)
    .mutation(({ input }) => candidateService.create(input)),
};

