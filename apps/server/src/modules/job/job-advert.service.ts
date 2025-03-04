import { createJobAdvertDto } from "./dto/create-job-advert.dto";
import { jobAdvertRepository, JobAdvertRepository } from "./repositories/job-advert.repository";

class JobAdvertService {
  constructor(
    private repository: JobAdvertRepository 
  ){}

  async create(job: createJobAdvertDto) {
      
  }
}

export const jobAdvertService = new JobAdvertService(jobAdvertRepository)
