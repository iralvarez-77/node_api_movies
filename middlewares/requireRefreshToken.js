import jwt from 'jsonwebtoken'

export const requireRefreshToken = (req, res, next) => {
  try {
    const {refreshToken} = req.cookies
    if (!refreshToken) throw new Error('No token provided')

    const user = jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH)
    req.user = user;
    next()

  } catch (error) {
    console.log('👀 👉🏽 ~  errorRequireRefreshToken:', error)
    
    if (error.message === 'No token provided') 
      return res.status(401).json({message: 'Unauthorized. Token is missing.'}) 

    if (error.name === "TokenExpiredError") 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    if(error.name === 'JsonWebTokenError') 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    res.status(403).json({mesagge: "Forbidden"})
  }
}