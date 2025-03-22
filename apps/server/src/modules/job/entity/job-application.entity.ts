import { model, Schema } from "mongoose";
import { JobApplication } from "./job-application.type";
import { jobAdvertModel } from "./job-advert.entity";
import { candidateModel } from "#modules/candidate/entity/candidate.entity";
import { randomUUID } from "node:crypto";
import { StatusApplication } from "@packages/types/enums";

const jobApplication = new Schema<JobApplication>({
  status: {
    enum: StatusApplication,
    default: StatusApplication.pending,
    type: String,
  },
  candidateId: {
    ref: candidateModel,
    type: String,
  },
  jobAdvertId: {
    ref: jobAdvertModel,
    type: String,
  },
  _id: {
    type: String,
    default: randomUUID(),
  },
});

const jobApplicationCollectionName = "job-application";
export const jobApplicationModel = model(
  jobApplicationCollectionName,
  jobApplication
);
