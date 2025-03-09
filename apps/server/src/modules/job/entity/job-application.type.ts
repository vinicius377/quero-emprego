import { CandidateDocument } from "#modules/candidate/entity/candidate.type"
import { HydratedDocument } from "mongoose"
import { Status } from "../utils/status"
import { JobAdvertDocument } from "./job-advert.type"

export interface JobApplication {
  candidateId: string | CandidateDocument
  jobAdvertId: string | JobAdvertDocument 
  status: Status
}

export type JobApplicationDocument = HydratedDocument<JobApplication>
