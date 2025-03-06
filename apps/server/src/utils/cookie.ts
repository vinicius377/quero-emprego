import cookie, { SerializeOptions } from 'cookie'
import {  } from "@trpc/server"
import { IncomingMessage, OutgoingMessage } from 'http'

export function getCookies(req: Request) {
  const cookieHeader = req.headers.get('Cookie')
  if (!cookieHeader) return {}
  return cookie.parse(cookieHeader)
}

export function getCookie(req: IncomingMessage, name: string) {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return
  const cookies = cookie.parse(cookieHeader)
  return cookies[name]
}

export function setCookie(
  resHeaders: (OutgoingMessage<IncomingMessage>)["setHeader"],
  name: string,
  value: string,
  options?: SerializeOptions
) {
  resHeaders('Set-Cookie', cookie.serialize(name, value, options))
}
