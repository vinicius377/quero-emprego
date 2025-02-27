import { Model } from "mongoose";
import { CreateBusiness } from "./validations/business.validation";
import { Business } from "./types/business.type";
import { businessModel } from "./entity/business.entity";

class BusinessService {
  constructor(
    private model: Model<Business>
  ) {}
  async create(body: CreateBusiness) {
    console.log(body)
    return
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


export const businessService = new BusinessService(businessModel)
