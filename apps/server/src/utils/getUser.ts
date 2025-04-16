import { IncomingMessage } from "node:http";
import { getCookie } from "../utils/cookie";
import { jwtService } from "#services/jwt.service";
import { TokenData } from "#modules/auth/types/token";

export const getUser = async (req: IncomingMessage) => {
  const token = getCookie(req, "auth") 

  if (!token) {
    return null
  }

  let user!:TokenData
  try {
     user = await jwtService.decodeAndValidate(token) as TokenData
  } catch {
    return null
  }

  return user
}

