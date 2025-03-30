import { updateCandidateValidator } from "@packages/validators/candidate/update-candidate";
import { businessProcedure, candidateProcedure, publicProcedure } from "../../libs/trpc";
import { candidateService } from "./candidate.service";
import { createCandidateValidator } from "@packages/validators/candidate/create-candidate";
import { z } from "zod";

export const candidate = {
  create: publicProcedure
    .input(createCandidateValidator)
    .mutation(({ input }) => candidateService.create(input)),
  getByToken: candidateProcedure.query(({ ctx }) =>
    candidateService.getById(ctx.user.id),
  ),
  edit: candidateProcedure
    .input(updateCandidateValidator)
    .mutation(({ input, ctx }) => candidateService.edit(input, ctx.user.id)),
  getById: businessProcedure.input(z.string()).query(({ input}) => candidateService.getById(input ))
};
