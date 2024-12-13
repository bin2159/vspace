// import { initAI } from '../pins/init.js'
import { initLogger } from '../pins/init.js'

export const attachAI = (req, res, next) => {
  req.logger = initLogger()
  // req.ai = initAI()
  next()
}
