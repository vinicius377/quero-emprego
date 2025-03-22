import { CandidateDocument } from "#modules/candidate/entity/candidate.type";
import { HydratedDocument } from "mongoose";
import { JobAdvertDocument } from "./job-advert.type";
import { StatusApplication } from "@packages/types/enums";

export interface JobApplication {
  candidateId: string | CandidateDocument;
  jobAdvertId: string | JobAdvertDocument;
  status: StatusApplication;
  _id: string;
}

export type JobApplicationDocument = HydratedDocument<JobApplication>;
