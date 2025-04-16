import { describe, expect, it } from "vitest";
import { authUserMiddleware } from "./auth.middleware";
import { IncomingMessage } from "http";
import { Role } from "@packages/types/enums";

describe(authUserMiddleware.name, () => {
  const req = {
    headers: { cookie: "" } 
  } as IncomingMessage

  it("should throw an error if user is not authenticaded", async () => {
    await expect(() => authUserMiddleware(Role.candidate, req)).rejects.toThrowError()
  })
})
