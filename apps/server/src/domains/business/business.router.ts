import { publicProcedure } from "../../trpc";

const business = {
  createBusiness: publicProcedure.query(async () => {
    return "world"
  }),
};

 export { business }
