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
    const data = await this.model
      .find({ candidateId })
      .populate(["candidateId", "jobAdvertId"]);

    return data.map(x => x.toObject())
  }

  async listByJobIdList(candidateId: string, jobsId: string[]) {
    const data = await this.model.find({ candidateId, jobAdvertId: { $in: jobsId } });

    return data.map(x => x.toObject())
  }

  async findByCandidateAndJobId(candidateId: string, jobId: string) {
    const data = await this.model.findOne({ candidateId, jobAdvertId: jobId })

    return data?.toObject()
  }

  async listByJobAdvert(id: string) {
    const data = await this.model.find({ jobAdvertId: id }).populate(["candidateId"])
    return data.map(x => x.toObject())
  }
}

export const jobApplicationRepository = new JobApplicationRepository(
  jobApplicationModel,
);
