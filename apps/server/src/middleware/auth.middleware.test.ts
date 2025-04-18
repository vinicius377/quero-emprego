import { describe, expect, it, vi } from "vitest";
import { authUserMiddleware } from "./auth.middleware";
import { IncomingMessage } from "http";
import { Role } from "@packages/types/enums";
import { businessToken, businessTokenData } from "#_mock_/AuthToken";
import { jwtService } from "#services/jwt.service";

vi.mock("#services/jwt.service", { spy: true })

describe(authUserMiddleware.name, () => {
  const req = {
    headers: { cookie: "" }
  } as IncomingMessage

  it("should throw an error if user is not authenticaded", async () => {
    await expect(authUserMiddleware(Role.candidate, req)).rejects.toThrowError()
  })

  it("should throw an error if token is invalid", async () => {
    const request = {
      ...req,
      headers: { cookie: "auth=invalid" }
    } as IncomingMessage
    await expect(authUserMiddleware(Role.candidate, request)).rejects.toThrowError()
  })

  it("should throw an error if user no has access", async () => {
    const request = {
      ...req,
      headers: { cookie: `auth=${businessToken}` }
    } as IncomingMessage

    vi.mocked(jwtService.decodeAndValidate).mockReturnValueOnce(Promise.resolve(businessTokenData))

    await expect(authUserMiddleware(Role.candidate, request)).rejects.toThrowError("Sem acesso a esse recurso")
  })

  it("should pass when user is authenticated and has access", async () => {
    const request = {
      ...req,
      headers: { cookie: `auth=${businessToken}` }
    } as IncomingMessage

    vi.mocked(jwtService.decodeAndValidate).mockReturnValueOnce(Promise.resolve(businessTokenData))

    const authUserMiddlewareSpy = vi.fn(authUserMiddleware)
    const user = await authUserMiddlewareSpy(Role.business, request)

    expect(authUserMiddlewareSpy).toHaveResolved()
    expect(user).toEqual(businessTokenData)
  })

})
