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
  phoneNumner: number
  cnpj: number
  location: Address
  password: string
}
