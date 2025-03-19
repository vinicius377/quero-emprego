import { Model } from "mongoose";
import { candidateModel } from "../entity/candidate.entity";
import { Candidate } from "../entity/candidate.type";
import { CreateCandidateDto } from "../dto/create-candidate.dto";

export class CandidateRepository {
  constructor(private model: Model<Candidate>) { }

  async create(dto: CreateCandidateDto) {
    const experience = dto.experience?.map((x) => ({
      ...x,
      endDate: x.endDate ? new Date(x.endDate).toISOString() : null,
      startDate: new Date(x.startDate).toISOString(),
    }));

    const education = dto.education?.map((x) => ({
      ...x,
      endDate: x.endDate ? new Date(x.endDate).toISOString() : null,
      startDate: new Date(x.startDate).toISOString(),
    }));

    const data = await this.model.create({
      name: dto.name,
      title: dto.title,
      password: dto.password,
      birthDate: new Date(dto.birthDate).toISOString(),
      description: dto.description,
      phoneNumber: dto.phoneNumber,
      education,
      experience,
    });

    return data.toObject()
  }

  async findById(id: string) {
    const data = await this.model.findById(id)
    return data?.toObject();
  }

  async findOne(params: Partial<Candidate>) {
    const data = await this.model.findOne(params)

    return data?.toObject()   
  }
}

export const candidateRepository = new CandidateRepository(candidateModel);
