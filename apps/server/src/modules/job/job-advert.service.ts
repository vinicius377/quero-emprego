import { BusinessDocument } from "#modules/business/entity/business.type";
import { CreateJobAdvertDto } from "./dto/create-job-advert.dto";
import { JobAdvertDocument } from "./entity/job-advert.type";
import {
  jobAdvertRepository,
  JobAdvertRepository,
} from "./repositories/job-advert.repository";
import { JobAdvertList } from "./types/job-advert-list.type";

class JobAdvertService {
  constructor(private repository: JobAdvertRepository) { }

  async create(dto: CreateJobAdvertDto, businessId: string) {
    const createdJobAdvert = await this.repository.create(dto, businessId);

    return createdJobAdvert;
  }

  async list() {
    const jobs = await this.repository.list();
    const listJobs = jobs.map<JobAdvertList>(this.mapToList);

    return listJobs;
  }

  private mapToList(job: JobAdvertDocument): JobAdvertList {
    const data = job.toObject();

    return {
      ...data,
      id: job._id.toString(),
      business: data.businessId as BusinessDocument,
    };
  }
}

export const jobAdvertService = new JobAdvertService(jobAdvertRepository);
