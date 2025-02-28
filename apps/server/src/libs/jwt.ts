import jwt from "jsonwebtoken"

class JWTService {
  private secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY || ""

  async sign(data: any) {
    return jwt.sign(data, this.secretOrPrivateKey, { expiresIn: '8h' })
  }

  async decodeAndValidate(token: string) {
    return jwt.verify(token, this.secretOrPrivateKey)
  }
}

export const jwtService = new JWTService()
