import winston from "winston"

//export const logger = winston.createLogger({
//  format: winston.format.json(),
//  level: winston.level
//})

class Logger {
  error(text: string) {
    console.log(`error: ${text}`)
  }

  sucess(text: string) {
    console.log(`sucess: ${text}`)
  }

  debug(text: string) {
    console.log(`debug: ${text}`)
  }

  info(text: string) {
    console.log(`info: ${text}`)
  }
}

export const logger = new Logger()
