import { Model } from "mongoose";
import { LoginDto } from "./validators/login.validator";
import { Business } from "#domains/business/types/business.type";
import { businessModel } from "#domains/business/entity/business.entity";

class Auth {

  constructor(
    private businessModel: Model<Business>
  ) {}

  async businessLogin(body: LoginDto) {
      
  }
}

export const authService = new Auth(businessModel)

