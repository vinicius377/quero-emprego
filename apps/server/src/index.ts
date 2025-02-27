import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes"
import cors from 'cors'
import { bootstrapDb } from "./libs/db";

async function bootstrap() {
  await bootstrapDb()

  const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    onError: (x) => {
      console.log(x)
      return { tetse: true}
    }
  });

  server.listen(3333);
}

bootstrap()

export type AppRouter = typeof appRouter;

