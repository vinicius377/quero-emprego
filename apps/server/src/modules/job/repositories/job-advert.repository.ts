import { jobAdvertModel } from "#modules/job/entity/job-advert.entity";
import { JobAdvert } from "#modules/job/entity/job-advert.type";
import { Model } from "mongoose";
import { CreateJobAdvertDto } from "../dto/create-job-advert.dto";
import { PaginationDto } from "#utils/pagination";

export class JobAdvertRepository {
  constructor(private model: Model<JobAdvert>) { }

  async create(dto: CreateJobAdvertDto, businessId: string) {
    return this.model.create({
      businessId,
      title: dto.title,
      description: dto.description,
      remuneration: dto.remuneration,
    });
  }

  async list(dto: PaginationDto) {
    const skip = dto.size * (dto.page - 1);
    return this.model.find().limit(dto.size).skip(skip).populate("businessId");
  }

  async listByBusinessId(dto: PaginationDto, businessId: string) {
    const skip = dto.size * (dto.page - 1);
    return this.model.find({ businessId }).limit(dto.size).skip(skip);
  }
}

export const jobAdvertRepository = new JobAdvertRepository(jobAdvertModel);
