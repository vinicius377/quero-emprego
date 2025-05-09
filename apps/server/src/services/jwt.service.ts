import jwt from "jsonwebtoken"

export class JWTService {
  private secretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY || ""

  async sign(data: any) {
    const timeInHours = 8 
    const exp = new Date()

    exp.setHours(exp.getHours() + timeInHours )
    const token = jwt.sign(data, this.secretOrPrivateKey, { expiresIn: `${timeInHours}h` })

    return {
      token,
      expires: exp
    } 
  }

  async decodeAndValidate(token: string) {
    return jwt.verify(token, this.secretOrPrivateKey)
  }
}

export const jwtService = new JWTService()
