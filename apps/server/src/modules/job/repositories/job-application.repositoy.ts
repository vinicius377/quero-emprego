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

  async listByCandidateId(candidateId: string) {
    return this.model
      .find({ candidateId })
      .populate(["candidateId", "jobAdvertId"]);
  }

  async listByJobIdList(candidateId: string, jobsId: string[]) {
    return this.model.find({ candidateId, jobAdvertId: { $in: jobsId } });
  }

  async findByCandidateAndJobId(candidateId: string, jobId: string) {
    return this.model.findOne({ candidateId, jobAdvertId: jobId })
  }

  async listByJobAdvert(id: string) {
    return this.model.find({ jobAdvertId: id }).populate(["candidateId"])
  }
}

export const jobApplicationRepository = new JobApplicationRepository(
  jobApplicationModel,
);
