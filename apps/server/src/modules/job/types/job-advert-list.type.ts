import { BusinessDocument } from "#modules/business/entity/business.type";

export interface JobAdvertList {
  title: string;
  description: string;
  remuneration?: number
  business: BusinessDocument 
  applied: boolean
  id: string
}
