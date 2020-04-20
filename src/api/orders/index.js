import express from 'express'

import { verifyToken } from '../../utils/security.js'
import Order from '../../models/Order.js'
import { createOrderValidation } from '../../validation/orders.js'
import { getWSSessionId } from '../../utils/websocket.js'

const orders = express.Router()

orders.get('/', verifyToken, async (req, res, next) => {
  const orders = await Order.find({ userId: req.user._id })
  return res.json({ orders })
})

orders.get('/:orderId', verifyToken, async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
  if (!order) return res.status(404).json({ error: 'not-found' })
  return res.json({ order })
})

orders.post('/', createOrderValidation, async (req, res, next) => {
  console.log('post order', req.body)
  const wsSessionId = await getWSSessionId(req.body.userId)
  console.log({ wsSessionId })
  const order = await Order.create(req.body)
  if (wsSessionId) {
    req.app
      .get('websocket')
      .emit('newOrder', { wsSessionId, order: order.toJSON() })
  }
  res.json({ status: 'ok' })
})

export default orders
