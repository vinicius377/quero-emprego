import { TRPCError } from "@trpc/server";
import { ApplyJobDto } from "./dto/apply-job.dto";
import { JobApplicationRepository, jobApplicationRepository } from "./repositories/job-application.repositoy";

class JobApplicationService {
  constructor(
    private repository: JobApplicationRepository 
  ) {}

  async apply(dto: ApplyJobDto, candidateId: string) {
    const applied = await this.repository.findByCandidateAndJobId(candidateId, dto.jobAdvertId)

    if (applied) {
      throw new TRPCError({ message: "Emprego ja aplicado", code: "CONFLICT"})
    }
    return this.repository.create(dto, candidateId) 
  }

  async listByCandidate(candidateId: string) {
    return this.repository.listByCandidateId(candidateId)
  }

  async listByJobAdvert(id: string) {
    return this.repository.listByJobAdvert(id)
  }
}

export const jobApplicationService = new JobApplicationService(jobApplicationRepository);
