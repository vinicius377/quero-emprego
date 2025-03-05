import { createJobAdvertDto } from "./dto/create-job-advert.dto";
import { jobAdvertRepository, JobAdvertRepository } from "./repositories/job-advert.repository";

class JobAdvertService {
  constructor(
    private repository: JobAdvertRepository 
  ){}

  async create(job: createJobAdvertDto) {
    const createdJobAdvert = this.repository.create(job, "")      
  }
}

export const jobAdvertService = new JobAdvertService(jobAdvertRepository)
