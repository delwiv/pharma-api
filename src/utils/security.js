import { get, set } from './redis.js'

export const verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth)
    return res.status(401).json({ error: 'Authorization header missing' })
  const token = auth.split('Bearer ')[1]
  console.log({ token })
  const userId = await get(token)
  console.log({ userId })

  next()
}
