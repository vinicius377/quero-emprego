import { Role } from "#utils/role";
import { IncomingMessage } from "node:http";
import { getCookie } from "../utils/cookie";
import { jwtService } from "#services/jwt.service";
import { TokenData } from "#modules/auth/types/token";
import { TRPCError } from "@trpc/server";

export const authUserMiddleware = async (role: Role, req: IncomingMessage) => {
  const token = getCookie(req, "auth") 
  if (!token) {
    throw new TRPCError({ message: "Token invalido", code: "UNAUTHORIZED"}) 
  }

  let user!:TokenData
  try {
     user = await jwtService.decodeAndValidate(token) as TokenData
  } catch {
    throw new TRPCError({ message: "Token invalido", code: "UNAUTHORIZED"}) 
  }

  if (user.role !== role) {
    throw new TRPCError({ message: "Sem acesso a esse recurso", code: "UNAUTHORIZED"}) 
  }

  return user
}

