import { Role } from "@packages/types/enums";
import { HydratedDocument } from "mongoose";

interface Education {
  courseName: string;
  institution: string;
  startDate: Date;
  endDate: Date;
}

interface Experience {
  roleName: string;
  startDate: Date;
  endDate: Date;
  description: string;
  businessName: string
}

export interface Candidate {
  name: string;
  title: string;
  birthDate: Date;
  description: string;
  phoneNumber: number;
  password: string;
  experience: Experience[];
  education: Education[];
  role: Role.candidate;
  _id: string;
}

export type CandidateDocument = HydratedDocument<Candidate>;
