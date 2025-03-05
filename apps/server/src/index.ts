import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes"
import { createContext } from "./libs/trpc"
import cors from 'cors'
import { bootstrapDb } from "./libs/db";

async function bootstrap() {
  await bootstrapDb()

  const server = createHTTPServer({
    router: appRouter,
    middleware: cors({
      credentials: true
    }),
    createContext,
  });

  server.listen(3333);
}

bootstrap()

export type AppRouter = typeof appRouter;

