import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";
import cors from 'cors'
import { bootstrapDb } from "./libs/db";
import { business } from "domains/business/business.router"

const appRouter = router({
  business
});

async function bootstrap() {
  await bootstrapDb()

  const server = createHTTPServer({
    router: appRouter,
    middleware: cors()
  });

  server.listen(3333);
}

bootstrap()

export type AppRouter = typeof appRouter;

