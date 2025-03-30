import { CreateBusinessDto } from "./dto/create-business.dto";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import {
  BusinessRepository,
  businessRepository,
} from "./repositories/business.repository";
import { TRPCError } from "@trpc/server";

class BusinessService {
  constructor(
    private repository: BusinessRepository,
    private bcryptService: BcryptService,
  ) { }

  async create(body: CreateBusinessDto) {
    await this.verifyPhoneNumberIsUsed(body.phoneNumber)
    await this.verifyCNPJIsUsed(body.cnpj)

    const password = await this.bcryptService.criptPassword(body.password);
    const createdBusiness = await this.repository.create({
      ...body,
      password,
    });

    return createdBusiness.toObject()
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  private async verifyPhoneNumberIsUsed(phoneNumber: number) {
    const alreadyExist = await this.repository.findOne({ phoneNumber })

    if (alreadyExist) throw new TRPCError({ message: "Já existe um usuário com esse número", code: "CONFLICT" })
  }

  private async verifyCNPJIsUsed(cnpj: number){
    const alreadyExist = await this.repository.findOne({ cnpj: String(cnpj) })

    if (alreadyExist) throw new TRPCError({ message: "Já existe um usuário com esse CNPJ", code: "CONFLICT" })
  }
}

export const businessService = new BusinessService(
  businessRepository,
  bcryptService,
);