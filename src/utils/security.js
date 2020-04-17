import { get, set, del, rearm } from './redis.js'

import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth)
    return res.status(401).json({ error: 'Authorization header missing' })
  const token = auth.split('Bearer ')[1]
  const userId = await get(token)
  console.log({ token, userId })

  if (!userId) {
    await del(token)
    return res.status(404).json({ error: 'User not found' })
  }
  const user = await User.findById(userId)
  if (!user) {
    await del(token)
    return res.status(404).json({ error: 'User not found' })
  }
  req.user = user
  await rearm(token)

  next()
}
