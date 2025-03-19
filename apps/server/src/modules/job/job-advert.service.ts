import { TokenData } from "#modules/auth/types/token";
import { BusinessDocument } from "#modules/business/entity/business.type";
import { PaginationDto } from "#utils/pagination";
import { Role } from "@packages/types/enums/index";
import { CreateJobAdvertDto } from "./dto/create-job-advert.dto";
import { JobAdvert } from "./entity/job-advert.type";
import { JobApplication } from "./entity/job-application.type";
import {
  jobAdvertRepository,
  JobAdvertRepository,
} from "./repositories/job-advert.repository";
import {
  jobApplicationRepository,
  JobApplicationRepository,
} from "./repositories/job-application.repositoy";

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

    let jobsApplication: JobApplication[] = [];

    if (user?.role === Role.candidate) {
      jobsApplication = await this.jobApplicationRepository.listByJobIdList(
        user.id,
        jobsId,
      );
    }

    const listJobs = jobs.map(this.mapToList(jobsApplication));

    return listJobs;
  }

  async listByBusiness(params: PaginationDto, businessId: string) {
    return this.repository.listByBusinessId(params, businessId)
  }

  async getById(id: string) {
    return this.repository.getById(id)
  }

  async changeStatus() {
    
  }

  private mapToList(jobsApplication: JobApplication[]) {
    return (job: JobAdvert) => {
      const data = job 
      const applied = jobsApplication.some(
        (x) => x.jobAdvertId.toString() === job._id,
      );
      const business = typeof data.businessId === "string" ? {} as BusinessDocument : data.businessId || {} as BusinessDocument

      return {
        applied,
        ...data,
        businessId: business,
      };
    };
  }
}

export const jobAdvertService = new JobAdvertService(
  jobAdvertRepository,
  jobApplicationRepository,
);
