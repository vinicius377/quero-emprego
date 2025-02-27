import { z } from "zod"

export const createBusinessValidation = z.object({
  cnpj: z.number().min(99999999999999).max(99999999999999),
  businessName: z.string().min(5),
  responsableName: z.string().min(5),
  phoneNumber: z.number().min(9999999999).max(99999999999),
  location: z.object({
    city: z.string() 
  })
})

export type CreateBusiness = z.infer<typeof createBusinessValidation>
