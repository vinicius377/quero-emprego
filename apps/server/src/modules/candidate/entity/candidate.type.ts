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
  cpf: string
  birthDate: Date
  description: string
  phoneNumber: number
  password: string
  experience: Experience[]
  education: Education[]
}
