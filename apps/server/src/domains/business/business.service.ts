import { CreateBusiness } from "./validations/business.validation";

class BusinessService {
  createBusiness(body: CreateBusiness) {
    console.log(body)
  }
}

export const businessService = new BusinessService()
