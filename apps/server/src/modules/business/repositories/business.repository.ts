import { Model } from "mongoose";
import { Business } from "../entity/business.type";
import { businessModel } from "../entity/business.entity";
import { CreateBusinessDto } from "../dto/create-business.dto";

export class BusinessRepository {
  constructor(private model: Model<Business>) { }

  async create(dto: CreateBusinessDto) {
    const data = {
      cnpj: dto.cnpj,
      location: {
        city: dto.location.city,
        state: dto.location.state,
        number: dto.location.number,
        address: dto.location.address,
        postalCode: dto.location.postalCode,
        neighborhood: dto.location.neighborhood,
      },
      phoneNumber: dto.phoneNumber,
      businessName: dto.businessName,
      responsableName: dto.responsableName,
      password: dto.password,
    };

    return this.model.create(data) 
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async findOne(params: Partial<Business>) {
    return this.model.findOne(params);
  }
}

export const businessRepository = new BusinessRepository(businessModel);
