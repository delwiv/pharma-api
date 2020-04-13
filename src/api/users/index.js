import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import uuid from 'uuid'

import { get, set } from '../../utils/redis.js'
import { verifyToken } from '../../utils/security.js'

const users = express.Router()

users.get('/me', verifyToken, async (req, res, next) => {
  const user = await fs.readFile(path.resolve('src', 'user.json'))
  //  await set('')
  res.json({ user })
  //res.json({ error: 'moho' })
})

users.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  if (email !== 'louis@test.com' && password !== '12345')
    return res.status(400).json({ error: 'bad-creds' })
  const user = JSON.parse(await fs.readFile(path.resolve('src', 'user.json')))
  const token = uuid.v4()
  await set(token, user._id)
  console.log({ user, token })
  res.json({ user, token })
})

export default users
