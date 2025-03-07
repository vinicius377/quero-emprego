import { Role } from "#utils/role";
import { IncomingMessage } from "node:http";
import { getCookie } from "../utils/cookie";

export const authUserMiddleware = async (role: Role, req: IncomingMessage) => {
  const token = getCookie(req, "auth")
  console.log("cookie", req.headers.cookie)
  console.log(token)
}

