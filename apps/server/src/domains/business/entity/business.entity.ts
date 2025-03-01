import { model, Schema } from "mongoose"
import { Business } from "../types/business.type"

const businessSchema = new Schema<Business>({
  businessName: {
    type: String
  },
  responsableName: {
    type: String
  },
  phoneNumner: {
    type: Number,
    min: 10,
    max: 11,
    unique: true
  },
  cnpj: {
    type: Number,
    unique: true
  },
  password: {
    type: String
  },
  location: {
    address: String,
    city: String,
    postalCode: Number,
    neighborhood: String,
    number: String,
    state: String
  }
})

export const businessCollectionName = "business"
export const businessModel = model(businessCollectionName, businessSchema) 

