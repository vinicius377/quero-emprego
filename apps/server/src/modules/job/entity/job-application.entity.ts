import { model, Schema } from "mongoose";
import { JobApplication } from "./job-application.type";
import { Status } from "../utils/status";
import { jobAdvertModel } from "./job-advert.entity";
import { candidateModel } from "#modules/candidate/entity/candidate.entity";

const jobApplication = new Schema<JobApplication>({
  status: {
    enum: Status,
    default: Status.pending,
    type: String
  },
  candidateId: {
    ref: candidateModel,
    type: String,
  },
  jobAdvertId: {
    ref: jobAdvertModel,
    type: String
  }
})

const jobApplicationCollectionName = "job-application"
export const jobApplicationModel = model(jobApplicationCollectionName, jobApplication)
