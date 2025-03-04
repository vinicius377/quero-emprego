import { CreateBusinessDto } from "./dto/create-business.dto";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { BusinessRepository, businessRepository } from "./repositories/business.repository";

class BusinessService {
  constructor(
    private repository: BusinessRepository,
    private bcryptService: BcryptService
  ) {}

  async create(body: CreateBusinessDto) {
    const password = await this.bcryptService.criptPassword(body.password)
    return this.repository.create({
      ...body,
      password
    })
  }

  async getById(id: string) {
    return this.repository.findById(id)
  }
}


export const businessService = new BusinessService(businessRepository, bcryptService)
