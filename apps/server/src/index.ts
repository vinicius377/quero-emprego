import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes";
import { createContext } from "./libs/trpc";
import cors from "cors";
import { bootstrapDb } from "./libs/db";
import type { AppRouter } from "@packages/trpc";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

async function bootstrap() {
  await bootstrapDb();

  const origin = ["http://localhost:3000", "http://localhost:3000"];
  const server = createHTTPServer({
    router: appRouter,
    middleware: cors({
      credentials: true,
      origin,
    }),
    createContext,
  });

  server.listen(3333);
}

bootstrap();

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
