import { Role } from "#utils/role"
import { HydratedDocument } from "mongoose"

interface Education {
  courseName: string
  instituition: string
  startDate: Date
  endDate: Date
}

interface Experience {
  roleName: string
  startDate: Date
  endDate: Date
  description: string 
}

export interface Candidate {
  name: string 
  title: string
  birthDate: Date
  description: string
  phoneNumber: number
  password: string
  experience: Experience[]
  education: Education[]
  role: Role.candidate
}

export type CandidateDocument = HydratedDocument<Candidate>
