import { Model } from "mongoose";
import { JobApplication } from "../entity/job-application.type";
import { ApplyJobDto } from "../dto/apply-job.dto";
import { jobApplicationModel } from "../entity/job-application.entity";

export class JobApplicationRepository {
  constructor(private model: Model<JobApplication>) { }

  async create(dto: ApplyJobDto, candidateId: string) {
    return this.model.create({
      candidateId,
      jobAdvertId: dto.jobAdvertId,
    });
  }
}

export const jobApplicationRepository = new JobApplicationRepository(
  jobApplicationModel,
);
