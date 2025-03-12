import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { candidateRepository, CandidateRepository } from "./repositories/candidate.repository";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { PaginationDto } from "#utils/pagination";

class CandidateService {
  constructor(
    private repository: CandidateRepository,
    private bcryptService: BcryptService
  ) {}

  async create(body: CreateCandidateDto) {
    const password = await this.bcryptService.criptPassword(body.password)
    const createdCandidate = await this.repository.create({
      ...body,
      password
    })

    return createdCandidate.toObject()
  }
}

export const candidateService = new CandidateService(candidateRepository, bcryptService)
