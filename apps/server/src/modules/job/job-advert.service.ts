import { CreateJobAdvertDto } from "./dto/create-job-advert.dto";
import { jobAdvertRepository, JobAdvertRepository } from "./repositories/job-advert.repository";

class JobAdvertService {
  constructor(
    private repository: JobAdvertRepository 
  ){}

  async create(dto: CreateJobAdvertDto, businessId: string) {
    const createdJobAdvert = await this.repository.create(dto, businessId)      

    return createdJobAdvert
  }

}

export const jobAdvertService = new JobAdvertService(jobAdvertRepository)
