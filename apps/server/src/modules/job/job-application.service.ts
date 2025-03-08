import { ApplyJobDto } from "./dto/apply-job.dto";
import { JobApplicationRepository, jobApplicationRepository } from "./repositories/job-application.repositoy";

class JobApplicationService {
  constructor(
    private repository: JobApplicationRepository 
  ) {}

  async apply(dto: ApplyJobDto, candidateId: string) {
    return this.repository.create(dto, candidateId) 
  }
}

export const jobApplicationService = new JobApplicationService(jobApplicationRepository);
