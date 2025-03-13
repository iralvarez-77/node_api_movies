
import jwt from "jsonwebtoken"

const requiredHeaderHToken = (req, res, next) => {

  try {
    let accessToken = req.headers.authorization
    if (!accessToken) throw new Error("No Bearer");

    accessToken = accessToken.split(" ")[1]
    const { id } = jwt.verify(accessToken, process.env.PRIVATE_KEY_ACCESS);
    req.user = id

    next()
  } catch (error) {
    console.log('👀 👉🏽 ~  errorRequiredHeaderHToken:', error)
    
  }
}

export default requiredHeaderHToken