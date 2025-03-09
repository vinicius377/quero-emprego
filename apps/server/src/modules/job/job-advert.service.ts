import { TokenData } from "#modules/auth/types/token";
import { BusinessDocument } from "#modules/business/entity/business.type";
import { PaginationDto } from "#utils/pagination";
import { Role } from "#utils/role";
import { CreateJobAdvertDto } from "./dto/create-job-advert.dto";
import { JobAdvertDocument } from "./entity/job-advert.type";
import { JobApplicationDocument } from "./entity/job-application.type";
import {
  jobAdvertRepository,
  JobAdvertRepository,
} from "./repositories/job-advert.repository";
import {
  jobApplicationRepository,
  JobApplicationRepository,
} from "./repositories/job-application.repositoy";
import { JobAdvertList } from "./types/job-advert-list.type";

class JobAdvertService {
  constructor(
    private repository: JobAdvertRepository,
    private jobApplicationRepository: JobApplicationRepository,
  ) { }

  async create(dto: CreateJobAdvertDto, businessId: string) {
    const createdJobAdvert = await this.repository.create(dto, businessId);

    return createdJobAdvert;
  }

  async list(dto: PaginationDto, user: TokenData | null) {
    const jobs = await this.repository.list(dto);
    const jobsId = jobs.map((x) => x._id.toString());

    let jobsApplication: JobApplicationDocument[] = [];

    if (user?.role === Role.candidate) {
      jobsApplication = await this.jobApplicationRepository.listByJobIdList(
        user.id,
        jobsId,
      );
    }

    const listJobs = jobs.map<JobAdvertList>(this.mapToList(jobsApplication));

    return listJobs;
  }

  private mapToList(jobsApplication: JobApplicationDocument[]) {
    return (job: JobAdvertDocument): JobAdvertList => {
      const data = job.toObject();
      const applied = jobsApplication.some(
        (x) => x.jobAdvertId.toString() === job._id.toString(),
      );

      return {
        id: job._id.toString(),
        business: data.businessId as BusinessDocument,
        applied,
        title: data.title,
        description: data.description,
        remuneration: data.remuneration
      };
    };
  }
}

export const jobAdvertService = new JobAdvertService(
  jobAdvertRepository,
  jobApplicationRepository,
);
