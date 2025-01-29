import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const secretKey = process.env.AUTH_SECRET_KEY || '94eafbd658700fe0bea6557921a88468180da87b6a80898d0cac8f56fffa3f8e52fa17434cb82146058ed677c3e18595180fe9fc69b3ec82fd73226ea4f074da'

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' })
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token provided!' })
    }

    req.user = decoded
    next()
  })
}

export default authMiddleware