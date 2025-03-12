import Cookies from "universal-cookie"
import type { RouterOutput } from "@packages/trpc"

type TokenData = RouterOutput["auth"]["businessLogin"]

class UserService {
  private cookie = new Cookies()
  private key = "user"

  get user() {
    return this.cookie.get(this.key) as TokenData
  }

  setUser(user: TokenData) {
    return this.cookie.set(this.key, user, { expires: user.expires })
  }
}

export const userService = new UserService()
