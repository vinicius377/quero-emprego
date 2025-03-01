import { Model } from "mongoose";
import { LoginDto } from "./dto/login.validator";
import { Business } from "#domains/business/types/business.type";
import { businessModel } from "#domains/business/entity/business.entity";
import { jwtService, JWTService } from "#services/jwt.service";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { TRPCError } from "@trpc/server";
import { TokenData } from "./types/token";

class Auth {
  constructor(
    private businessModel: Model<Business>,
    private jwtService: JWTService,
    private bcryptService: BcryptService,
  ) { }

  async businessLogin(body: LoginDto) {
    const business = await this.businessModel.findOne({
      phoneNumner: body.phoneNumber,
    });

    if (!business)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

    const matchPassword = await this.bcryptService.compare(
      body.password,
      business?.password,
    );

    if (!matchPassword)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

     await this.jwtService.sign(this.mountTokenPayloadToBusiness(business))
  }

  private mountTokenPayloadToBusiness(business: Business): TokenData {
    return {
      name: business.responsableName,
      phoneNumber: business.phoneNumner,
    }
  }
}

export const authService = new Auth(businessModel, jwtService, bcryptService);
