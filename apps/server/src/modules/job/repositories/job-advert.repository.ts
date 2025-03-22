import { jobAdvertModel } from "#modules/job/entity/job-advert.entity";
import { JobAdvert } from "#modules/job/entity/job-advert.type";
import { Model } from "mongoose";
import { CreateJobAdvertDto } from "../dto/create-job-advert.dto";
import { PaginationDto } from "#utils/pagination";
import { UpdateJobAdvertDto } from "../dto/update-job-advert.dto";

export class JobAdvertRepository {
  constructor(private model: Model<JobAdvert>) {}

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
    const data = await this.model
      .find()
      .limit(dto.size)
      .skip(skip)
      .populate("businessId");

    return data.map((x) => x.toObject());
  }

  async listByBusinessId(dto: PaginationDto, businessId: string) {
    const skip = dto.size * (dto.page - 1);
    return this.model.find({ businessId }).limit(dto.size).skip(skip);
  }

  async getById(id: string) {
    const data = await this.model.findById(id);
    return data?.toObject();
  }

  async update(dto: UpdateJobAdvertDto, businessId: string) {
    await new Promise((res) => setTimeout(res, 3000));
    const data = await this.model.findOneAndUpdate(
      {
        businessId,
        _id: dto.id,
      },
      dto,
      { new: true }
    );

    return data?.toObject();
  }
}

export const jobAdvertRepository = new JobAdvertRepository(jobAdvertModel);
