import { Model } from "mongoose";
import { CreateBusinessDto } from "./dto/create-business.dto";
import { Business } from "./types/business.type";
import { businessModel } from "./entity/business.entity";
import { bcryptService, BcryptService } from "#services/bcrypt.service";

class BusinessService {
  constructor(
    private model: Model<Business>,
    private bcryptService: BcryptService
  ) {}

  async create(body: CreateBusinessDto) {
    const password = this.bcryptService.criptPassword(body.password)
    return this.model.create({
      cnpj: body.cnpj,
      location: {
        city: body.location.city 
      },
      phoneNumber: body.phoneNumber,
      businessName: body.businessName,
      responsableName: body.responsableName
    })
  }

  async getById(id: string) {
    return this.model.findById(id)
  }
}


export const businessService = new BusinessService(businessModel, bcryptService)
