import { CreateJobAdvertDto } from "./dto/create-job-advert.dto";
import { jobAdvertRepository, JobAdvertRepository } from "./repositories/job-advert.repository";
import { JobAdvertList } from "./types/job-advert-list.type";

class JobAdvertService {
  constructor(
    private repository: JobAdvertRepository 
  ){}

  async create(dto: CreateJobAdvertDto, businessId: string) {
    const createdJobAdvert = await this.repository.create(dto, businessId)      

    return createdJobAdvert
  }

  async list() {
    const jobs = await this.repository.list()
    const listJobs = jobs.map(x => x.toObject() as JobAdvertList)

    return listJobs
  }

}

export const jobAdvertService = new JobAdvertService(jobAdvertRepository)
