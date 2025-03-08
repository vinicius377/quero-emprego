import { model, Schema } from "mongoose";
import { Candidate } from "./candidate.type";
import { Role } from "#utils/role";

const experienceSchema = new Schema({
  roleName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

const edutationSchema = new Schema({
  courseName: { type: String, required: true },
  instituition: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

const candidateSchema = new Schema<Candidate>({
  name: { type: String, required: true },
  title: { type: String },
  birthDate: { type: Date, required: true },
  description: { type: String },
  phoneNumber: { type: Number },
  password: { type: String, required: true },
  experience: { type: [experienceSchema] },
  education: { type: [edutationSchema] },
  role: {
    type: String,
    enum: Role,
    default: Role.candidate,
  },
});

const candidateCollectionName = "candidate";
candidateSchema.pre("find", function(next) {
  this.select("-password");
  next();
});

export const candidateModel = model(candidateCollectionName, candidateSchema);
