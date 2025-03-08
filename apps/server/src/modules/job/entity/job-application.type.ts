import { Status } from "../utils/status"

export interface JobApplication {
  candidateId: string
  jobAdvertId: string 
  status: Status
}
