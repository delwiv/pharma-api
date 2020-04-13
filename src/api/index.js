import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'

import users from './users/index.js'
const api = express.Router()

api.get('/orders', async (req, res) => {
  console.log('get orders')
  const orders = await fs.readFile(path.resolve('src', 'orders.json'))

  res.json({ orders: JSON.parse(orders) })
})
api.use('/users', users)

export default api
