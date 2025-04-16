import { describe, expect, it, vi } from "vitest";
import * as trpc from "./trpc";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { businessToken, businessTokenData, candidateTokenData } from "#_mock_/AuthToken";
import { getUser } from "#utils/getUser";
import { IncomingMessage } from "http";
import { authUserMiddleware } from "#middleware/auth.middleware";

vi.mock("#utils/getUser", { spy: true })
vi.mock("#middleware/auth.middleware", { spy: true })

describe("trpc module", () => {
  const context = {
    req: {
      headers: { cookie: "" }
    },
    res: {}
  } as CreateHTTPContextOptions;

  const appRouter = trpc.router({
    public: trpc.publicProcedure.query(({ ctx }) => ctx),
    candidate: trpc.candidateProcedure.query(({ ctx }) => ctx),
    business: trpc.businessProcedure.query(({ ctx }) => ctx)
  });
  const createCaller = trpc.createCallerFactory(appRouter)

  const createCtx = (req: Partial<IncomingMessage>) => ({
    ...context,
    req
  } as CreateHTTPContextOptions
  )

  it(`${trpc.createContext.name} must return req and res`, async () => {
    const result = await trpc.createContext(context);

    expect(result).toEqual(context)
  });

  describe("publicProcedure", () => {

    it("publicProcedure must return user as null if no authenticated", async () => {
      const caller = createCaller(context)

      const result = await caller.public()

      expect(result.user).toBeNull()
    })

    it("publicProcedure must return return user as null if authenticated as business", async () => {
      const caller = createCaller(createCtx({ headers: { cookie: `auth=${businessToken}` } }))

      vi.mocked(getUser).mockReturnValueOnce(Promise.resolve(businessTokenData))

      const result = await caller.public()

      expect(result.user).toBeNull()
    })

    it("publicProcedure must return return user if authenticated as candidate", async () => {
      const caller = createCaller(createCtx({ headers: { cookie: `auth=${businessToken}` } }))

      vi.mocked(getUser).mockReturnValueOnce(Promise.resolve(candidateTokenData))

      const result = await caller.public()

      expect(result.user).toEqual(candidateTokenData)
    })
  })

  describe("candidateProcedure", () => {
    it("candidateProcedure must return user if authenticated", async () => {
      const caller = createCaller(createCtx({ headers: { cookie: `auth=${businessToken}` } }))

      vi.mocked(authUserMiddleware).mockReturnValueOnce(Promise.resolve(candidateTokenData))
  
      const result = await caller.candidate()

      expect(result.user).toEqual(candidateTokenData)
    })
  })

  describe("businessProcedure", () => {
    it("businessProcedure must return user if authenticated", async () => {
      const caller = createCaller(createCtx({ headers: { cookie: `auth=${businessToken}` } }))

      vi.mocked(authUserMiddleware).mockReturnValueOnce(Promise.resolve(businessTokenData))
  
      const result = await caller.candidate()

      expect(result.user).toEqual(businessTokenData)
    })
  })
});

