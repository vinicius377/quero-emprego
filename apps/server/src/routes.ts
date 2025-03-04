import { router } from "./libs/trpc";
import { business } from "./modules/business/business.router"

export const appRouter = router({
  business
});

