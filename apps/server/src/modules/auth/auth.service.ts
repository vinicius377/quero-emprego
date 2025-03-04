import { Model } from "mongoose";
import { LoginDto } from "./dto/login.validator";
import { jwtService, JWTService } from "#services/jwt.service";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { TRPCError } from "@trpc/server";
import { TokenData } from "./types/token";
import { businessRepository, BusinessRepository } from "#modules/business/repositories/business.repository";
import { candidateRepository, CandidateRepository } from "#modules/candidate/repositories/candidate.repository";
import { Business } from "#modules/business/entity/business.type";

class Auth {
  constructor(
    private businessRepository: BusinessRepository,
    private candidateRepository: CandidateRepository,
    private jwtService: JWTService,
    private bcryptService: BcryptService,
  ) { }

  async businessLogin(body: LoginDto) {
    const business = await this.businessRepository.findOne({
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

    await this.jwtService.sign(this.mountTokenPayloadToBusiness(business));
  }

  private mountTokenPayloadToBusiness(business: Business): TokenData {
    return {
      name: business.responsableName,
      phoneNumber: business.phoneNumner,
    };
  }
}

export const authService = new Auth(
  businessRepository,
  candidateRepository,
  jwtService,
  bcryptService,
);
