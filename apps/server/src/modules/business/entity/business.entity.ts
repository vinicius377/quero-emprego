import { model, Schema } from "mongoose";
import { Business } from "./business.type";
import { Role } from "#utils/role";

const businessSchema = new Schema<Business>({
  businessName: {
    type: String,
  },
  responsableName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    min: 10,
    max: 11,
    unique: true,
  },
  cnpj: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  location: {
    address: String,
    city: String,
    postalCode: Number,
    neighborhood: String,
    number: String,
    state: String,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.business
  }
});

const businessCollectionName = "business";
export const businessModel = model(businessCollectionName, businessSchema);
