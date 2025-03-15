import { LoginDto } from "./dto/login.dto";
import { jwtService, JWTService } from "#services/jwt.service";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { TRPCError } from "@trpc/server";
import { TokenData } from "./types/token";
import {
  businessRepository,
  BusinessRepository,
} from "#modules/business/repositories/business.repository";
import {
  candidateRepository,
  CandidateRepository,
} from "#modules/candidate/repositories/candidate.repository";
import { BusinessDocument } from "#modules/business/entity/business.type";
import { CandidateDocument } from "#modules/candidate/entity/candidate.type";

class Auth {
  constructor(
    private businessRepository: BusinessRepository,
    private candidateRepository: CandidateRepository,
    private jwtService: JWTService,
    private bcryptService: BcryptService,
  ) { }

  async businessLogin(body: LoginDto) {
    const business = await this.businessRepository.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (!business)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

    const matchPassword = await this.bcryptService.compare(
      body.password,
      business?.password,
    );

    if (!matchPassword)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

    const payload = this.mountTokenPayloadToBusiness(business);
    const { token, expires } = await this.jwtService.sign(payload);

    return {
      token,
      payload: {
        ...payload,
        expires,
      },
    };
  }

  async candidateLogin(body: LoginDto) {
    const candidate = await this.candidateRepository.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (!candidate)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

    const matchPassword = await this.bcryptService.compare(
      body.password,
      candidate?.password,
    );

    if (!matchPassword)
      throw new TRPCError({ message: "Nao autorizado", code: "UNAUTHORIZED" });

    const payload = this.mountTokenPayloadToCandidate(candidate);
    const { token, expires } = await this.jwtService.sign(payload);

    return {
      token,
      payload: {
        ...payload,
        expires,
      },
    };
  }

  private mountTokenPayloadToBusiness(business: BusinessDocument): TokenData {
    return {
      name: business.responsableName,
      phoneNumber: business.phoneNumber,
      role: business.role,
      id: business._id.toString(),
    };
  }

  private mountTokenPayloadToCandidate(
    candidate: CandidateDocument,
  ): TokenData {
    return {
      name: candidate.name,
      phoneNumber: candidate.phoneNumber,
      role: candidate.role,
      id: candidate._id.toString(),
    };
  }
}

export const authService = new Auth(
  businessRepository,
  candidateRepository,
  jwtService,
  bcryptService,
);
