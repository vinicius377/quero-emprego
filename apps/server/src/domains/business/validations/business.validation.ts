import { z } from "zod"

export const createBusinessValidation = z.object({
  cnpj: z.number(),
  businessName: z.string(),
  responsableName: z.string(),
  phoneNumber: z.number(),
  location: z.object({
    city: z.string() 
  })
})

export type CreateBusiness = z.infer<typeof createBusinessValidation>
