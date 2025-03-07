import {serialize, parse, SerializeOptions } from 'cookie'
import { IncomingMessage, OutgoingMessage } from 'http'

export function getCookies(req: Request) {
  const cookieHeader = req.headers.get('Cookie')
  if (!cookieHeader) return {}
  return parse(cookieHeader)
}

export function getCookie(req: IncomingMessage, name: string) {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return
  const cookies = parse(cookieHeader)
  return cookies[name]
}

export function setCookie(
  resHeaders: (OutgoingMessage<IncomingMessage>)["setHeader"],
  name: string,
  value: string,
  options?: SerializeOptions
) {
  resHeaders('set-cookie', serialize(name, value, options))
}
