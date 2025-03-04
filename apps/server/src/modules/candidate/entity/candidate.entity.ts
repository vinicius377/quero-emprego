import { model, Schema } from "mongoose";
import { Candidate } from "./candidate.type";

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
  cpf: { type: String, required: true },
  birthDate: { type: Date, required: true},
  description: { type: String },
  phoneNumber: { type: Number },
  password: { type: String, required: true},
  experience: { type: [experienceSchema] },
  education: { type: [edutationSchema] },
});

export const candidateCollectionName = "candidate";
export const candidateModel = model(candidateCollectionName, candidateSchema);
