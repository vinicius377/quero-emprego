import bcrypt from "bcrypt"

export class BcryptService {
  private saltRounds = 10;

  async criptPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds)
  }

  async compare(password: string, hashedPassowrd: string) {
    return bcrypt.compare(password, hashedPassowrd)
  }

}

export const bcryptService = new BcryptService
