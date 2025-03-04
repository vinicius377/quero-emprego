import { Model } from "mongoose";
import { Business } from "../entity/business.type";
import { businessModel } from "../entity/business.entity";
import { CreateBusinessDto } from "../dto/create-business.dto";

export class BusinessRepository {
  constructor(private model: Model<Business>) { }

  async create(dto: CreateBusinessDto) {
    return this.model.create({
      cnpj: dto.cnpj,
      location: {
        city: dto.location.city,
      },
      phoneNumber: dto.phoneNumber,
      businessName: dto.businessName,
      responsableName: dto.responsableName,
    });
  }

  async findById(id: string) {
    return this.model.findById(id)
  }

  async findOne(params: Partial<Business>) {
    return this.model.findOne(params)
  }
}

export const businessRepository = new BusinessRepository(businessModel)
