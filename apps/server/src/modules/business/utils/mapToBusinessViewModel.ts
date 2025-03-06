import { BusinessDocument } from "../entity/business.type";
import { BusinessViewModel } from "../types/business-view-model.type";

export const mapToBusinessViewModel = (business: BusinessDocument): BusinessViewModel => ({
  location: business.location,
  cnpj: business.cnpj,
  role: business.role,
  phoneNumber: business.phoneNumber,
  businessName: business.businessName,
  responsableName: business.responsableName,
  id: business._id.toString()
})
