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

export default orders
