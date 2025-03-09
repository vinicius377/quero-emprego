import z from "zod"

export const paginationValidator = z.object({
  page: z.preprocess(x => parseInt(x as string), z.number()),
  size: z.preprocess(x => parseInt(x as string), z.number()),
  term: z.string().optional()
})

export type PaginationDto = z.infer<typeof paginationValidator>
