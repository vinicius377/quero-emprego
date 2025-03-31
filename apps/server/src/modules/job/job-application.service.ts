import { TRPCError } from "@trpc/server";
import { ApplyJobDto } from "./dto/apply-job.dto";
import {
  JobApplicationRepository,
  jobApplicationRepository,
} from "./repositories/job-application.repository";
import { Candidate } from "#modules/candidate/entity/candidate.type";
import { jobAdvertRepository, JobAdvertRepository } from "./repositories/job-advert.repository";
import { StatusJob } from "@packages/types/enums";

class JobApplicationService {
  constructor(
    private repository: JobApplicationRepository,
    private jobAdvertRepository: JobAdvertRepository
  ) { }

  async apply(dto: ApplyJobDto, candidateId: string) {
    const applied = await this.repository.findByCandidateAndJobId(
      candidateId,
      dto.jobAdvertId
    );

    if (applied) {
      throw new TRPCError({ message: "Emprego ja aplicado", code: "CONFLICT" });
    }
    console.log(this.jobAdvertRepository)
    const jobAdvert = await this.jobAdvertRepository.getById(dto.jobAdvertId)

    if (jobAdvert?.status !== StatusJob.opened) {
      throw new TRPCError({ message: "Essa vaga não aceita mais candidatos", code: "CONFLICT" });
    }

    return this.repository.create(dto, candidateId);
  }

  async listByCandidate(candidateId: string) {
    return this.repository.listByCandidateId(candidateId);
  }

  async listByJobAdvert(id: string) {
    const data = await this.repository.listByJobAdvert(id);
    return data.map((x) => ({
      ...x,
      candidateId: x.candidateId as Candidate,
    }));
  }
}

export const jobApplicationService = new JobApplicationService(
  jobApplicationRepository,
  jobAdvertRepository
);