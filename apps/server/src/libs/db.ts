import { connect } from "mongoose"
import { logger } from "./logger"

const url = process.env.MONGODB_URL || ""

export async function bootstrapDb () {
  try {
    await connect(url)
    logger.info("@bootstrapDb: db sucessfull connected")
  } catch(err) {
    logger.error("@bootstrapDb: error in connect on db") 
    logger.debug(err as string)

    throw new Error()
  }

}
