import { jobAdvertModel } from "#modules/job/entity/job-advert.entity";
import { JobAdvert } from "#modules/job/entity/job-advert.type";
import { Model } from "mongoose";
import { createJobAdvertDto } from "../dto/create-job-advert.dto";

export class JobAdvertRepository {
  constructor(
    private readonly model: Model<JobAdvert>
  ){}

  async create(dto: createJobAdvertDto, businessId: string) {
    return this.model.create({
      businessId,
      title: dto.title,
      description: dto.description,
      remuneration: dto.remuneration
    })
  }

}

export const jobAdvertRepository = new JobAdvertRepository(jobAdvertModel)
