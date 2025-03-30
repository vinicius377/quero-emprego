import { model, Schema } from "mongoose";
import { Candidate } from "./candidate.type";
import { randomUUID } from "node:crypto";
import { Role } from "@packages/types/enums";

const experienceSchema = new Schema({
  roleName: { type: String, required: true },
  businessName: { type: String, required: true},
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

const educationSchema = new Schema({
  courseName: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

const candidateSchema = new Schema<Candidate>({
  name: { type: String, required: true },
  title: { type: String, default: "" },
  birthDate: { type: Date, required: true },
  description: { type: String, default: "" },
  phoneNumber: { type: Number },
  password: { type: String, required: true },
  experience: { type: [experienceSchema], default: [] },
  education: { type: [educationSchema], default: [] },
  role: {
    type: String,
    enum: Role,
    default: Role.candidate,
  },
  _id: {
    type: String,
    default: randomUUID(),
  },
}, { timestamps: true});

const candidateCollectionName = "candidate";
candidateSchema.pre("find", function (next) {
  this.select("-password");
  next();
});

export const candidateModel = model(candidateCollectionName, candidateSchema);
