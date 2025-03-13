import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  try {
    const {accessToken} = req.cookies
    if (!accessToken) throw new Error('No token provided')

    const user = jwt.verify(accessToken, process.env.PRIVATE_KEY_ACCESS)
    req.user = user;
    next()

  } catch (error) {
    console.log('👀 👉🏽 ~  errorAuthRequired:', error)
    
    if (error.message === 'No token provided') 
      return res.status(401).json({message: 'Unauthorized. Token is missing.'}) 

    if (error.name === "TokenExpiredError") 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    if(error.name === 'JsonWebTokenError') 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    res.status(403).json({mesagge: "Forbidden"})
  }
}