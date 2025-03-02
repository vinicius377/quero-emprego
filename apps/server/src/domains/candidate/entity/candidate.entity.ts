import { model, Schema } from "mongoose"

const experienceSchema = new Schema({
    roleName: { type: String }, 
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
})

const edutationSchema = new Schema({
    courseName: { type: String }, 
    instituition: { type: String },
    startDate: { type: Date },
    endDate:  { type: Date },
})

const candidateSchema = new Schema({
  cpf: { type: String }, 
  name: { type: String},
  title: { type: String},
  description: { type: String}, 
  experience: { type: [experienceSchema] },
  education: { type: edutationSchema} 
})

export const candidateCollectionName="candidate"
export const candidateModel = model(candidateCollectionName, candidateSchema)
