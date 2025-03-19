import { model, Schema } from "mongoose";
import { JobAdvert } from "./job-advert.type";
import { businessModel } from "#modules/business/entity/business.entity";
import { randomUUID } from "node:crypto";
import { StatusJob } from "@packages/types/enums/index";

const jobAdvert = new Schema<JobAdvert>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  remuneration: {
    type: Number,
    default: 0,
  },
  businessId: {
    ref: businessModel,
    type: String,
  },
  status: {
    type: String,
    enum: StatusJob,
    default: StatusJob.openend
  },
  _id: {
    type: String,
    default: randomUUID()
  },
});

const jobAdvertCollectionName = "job-advert";
export const jobAdvertModel = model(jobAdvertCollectionName, jobAdvert);
