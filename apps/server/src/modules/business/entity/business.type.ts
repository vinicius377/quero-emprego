import { Role } from "#utils/role"

interface Address {
    address: string,
    city: string,
    postalCode: number,
    neighborhood: string,
    number: string,
    state: string
}

export interface Business {
  businessName: string
  responsableName: string
  phoneNumber: number
  cnpj: string 
  location: Address
  password: string
  role: Role.business
}
