import { auth } from "./modules/auth/auth.router";
import { candidate } from "./modules/candidate/candidate.router";
import { router } from "./libs/trpc";
import { business } from "./modules/business/business.router";
import { jobAdvert } from "./modules/job/job-advert.router";
import { jobApplication } from "./modules/job/job-application.router";

export const appRouter = router({
  business,
  candidate,
  auth,
  jobAdvert,
  jobApplication
});
