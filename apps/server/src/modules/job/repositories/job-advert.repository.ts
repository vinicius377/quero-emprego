import { jobAdvertModel } from "#modules/job/entity/job-advert.entity";
import { JobAdvert } from "#modules/job/entity/job-advert.type";
import { Model } from "mongoose";

export class JobAdvertRepository {
  constructor(
    private readonly model: Model<JobAdvert>
  ){}

}

export const jobAdvertRepository = new JobAdvertRepository(jobAdvertModel)
