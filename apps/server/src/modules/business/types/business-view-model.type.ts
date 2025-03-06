import { Role } from "#utils/role"
import { Address } from "../entity/business.type"

export interface BusinessViewModel {
  businessName: string
  responsableName: string
  phoneNumber: number
  cnpj: string 
  location: Address
  role: Role.business
  id: string
}
