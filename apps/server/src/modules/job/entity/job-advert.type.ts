import { BusinessDocument } from "#modules/business/entity/business.type";
import { HydratedDocument } from "mongoose";
import { StatusJob } from "@packages/types/enums/index";

export interface JobAdvert {
  title: string;
  description: string;
  remuneration?: number
  businessId: string | BusinessDocument;
  _id: string
  status: StatusJob
}

export type JobAdvertDocument = HydratedDocument<JobAdvert>
