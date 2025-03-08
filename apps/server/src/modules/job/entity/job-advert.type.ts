import { BusinessDocument } from "#modules/business/entity/business.type";
import { HydratedDocument } from "mongoose";

export interface JobAdvert {
  title: string;
  description: string;
  remuneration?: number
  businessId: string | BusinessDocument;
}

export type JobAdvertDocument = HydratedDocument<JobAdvert>
