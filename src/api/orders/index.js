import express from 'express'

import { verifyToken } from '../../utils/security.js'
import Order from '../../models/Order.js'

const orders = express.Router()

orders.get('/', verifyToken, async (req, res, next) => {
  if (req.params.userId === 'me') {
    const orders = await Order.find({ userId: req.user._id })
    return res.json({ orders: orders.toJSON() })
  }
  const orders = await Order.find({ userId: req.params.userId })
  return res.json({ orders })
})

orders.get('/:orderId', verifyToken, async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
  if (!order) return res.status(404).json({ error: 'not-found' })
  return res.json({ order })
})

orders.post('/', async (req, res, next) => {
  console.log('post order')
  const { wsSessionId } = req.body
  console.log({ wsSessionId })
  const order = await Order.findOne({ status: 'new' })
  console.log({ order })
  req.app
    .get('websocket')
    .emit('newOrder', { wsSessionId, order: order.toJSON() })
  res.json({ status: 'ok' })
})

export default orders
