import { BusinessDocument } from "#modules/business/entity/business.type";

export interface JobAdvert {
  title: string;
  description: string;
  remuneration?: number
  businessId: string | BusinessDocument;
}
