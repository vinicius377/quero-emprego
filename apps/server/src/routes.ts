import { router } from "./libs/trpc";
import { business } from "./domains/business/business.router"

export const appRouter = router({
  business
});

