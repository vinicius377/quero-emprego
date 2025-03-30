import { CreateCandidateDto } from "./dto/create-candidate.dto";
import {
  candidateRepository,
  CandidateRepository,
} from "./repositories/candidate.repository";
import { bcryptService, BcryptService } from "#services/bcrypt.service";
import { UpdateCandidateDto } from "./dto/update-candidate.dto";

class CandidateService {
  constructor(
    private repository: CandidateRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(body: CreateCandidateDto) {
    const password = await this.bcryptService.criptPassword(body.password);
    const createdCandidate = await this.repository.create({
      ...body,
      password,
    });

    return createdCandidate;
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async edit(dto: UpdateCandidateDto, id: string) {
    return this.repository.update(dto, id);
  }
}

export const candidateService = new CandidateService(
  candidateRepository,
  bcryptService,
);
