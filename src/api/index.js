import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'

import users from './users/index.js'
import orders from './orders/index.js'

import populateTestData from '../models/populateTestData.js'

const api = express.Router()

//api.get('/orders', async (req, res) => {
//  console.log('get orders')
//  const orders = await fs.readFile(path.resolve('src', 'orders.json'))
//
//  res.json({ orders: JSON.parse(orders) })
//})
api.use('/users', users)
api.use('/users/:userId/orders', orders)

api.post('/populateTestData', async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'development')
      return res.json({ error: `bad-env: ${process.env.NODE_ENV}` })
    await populateTestData()
    return res.json({ status: 'OK' })
  } catch (error) {
    next(error)
  }
})
export default api
