import { model, Schema } from "mongoose";
import { Business } from "./business.type";
import { randomUUID } from "node:crypto";
import { Role } from "@packages/types/enums";

const businessSchema = new Schema<Business>({
  businessName: {
    type: String,
  },
  responsableName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 11,
    unique: true,
  },
  cnpj: {
    type: String,
    unique: true,
    minlength: 14,
    maxlength: 14,
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
    default: Role.business,
  },
  _id: {
    type: String,
    default: randomUUID(),
    unique: true,
  },
}, { timestamps: true });

const businessCollectionName = "business";
businessSchema.pre("find", function (next) {
  this.select("-password");
  next();
});

export const businessModel = model(businessCollectionName, businessSchema);
