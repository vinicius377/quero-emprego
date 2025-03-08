import { CreateBusinessDto } from "./dto/create-business.dto";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import {
  BusinessRepository,
  businessRepository,
} from "./repositories/business.repository";
import { BusinessDocument } from "./entity/business.type";

class BusinessService {
  constructor(
    private repository: BusinessRepository,
    private bcryptService: BcryptService,
  ) { }

  async create(body: CreateBusinessDto) {
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
}

export const businessService = new BusinessService(
  businessRepository,
  bcryptService,
);
