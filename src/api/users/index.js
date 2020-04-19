import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import uuid from 'uuid'

import { get, set, del } from '../../utils/redis.js'
import { verifyToken } from '../../utils/security.js'
import { genWSSessionId, getWSSessionId } from '../../utils/websocket.js'
import User from '../../models/User.js'

const users = express.Router()

users.get('/me', verifyToken, async (req, res, next) => {
  let wsSessionId = await getWSSessionId(req.user._id)
  if (!wsSessionId) wsSessionId = await genWSSessionId(req.user._id)
  res.json({ user: req.user, wsSessionId })
})

users.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) return res.status(400).json({ error: 'bad-creds' })

  if (user.password !== password)
    return res.status(400).json({ error: 'bad-creds' })

  const token = uuid.v4()
  await set(token, user._id)
  const wsSessionId = await genWSSessionId(user._id)
  res.json({ user, token, wsSessionId })
})

users.post('/logout', async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1]
  await del(token)
  res.json({ error: null })
})

export default users
