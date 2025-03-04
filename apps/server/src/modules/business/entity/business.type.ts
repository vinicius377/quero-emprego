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
  cnpj: string 
  location: Address
  password: string
}
