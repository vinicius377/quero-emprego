import { Role } from "#utils/role";
import { IncomingMessage } from "node:http";
import { getCookie } from "./cookie";

export const authUser = async (role: Role, req: IncomingMessage) => {
  const token = getCookie(req, "auth")
}
