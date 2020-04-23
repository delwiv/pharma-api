import express from 'express'

import { verifyToken } from '../../utils/security.js'
import Order from '../../models/Order.js'
import { createOrderValidation } from '../../validation/orders.js'
import { getWSSessionId } from '../../utils/websocket.js'
import { statuses } from '../../utils/constants.js'

const orders = express.Router()

const getActions = (status, role) =>
  statuses[status].reduce((acc, [action]) => {
    if (action.startsWith('_')) return acc
    if (action.startsWith('-')) {
      if (!['patient', 'admin'].includes(role)) {
        return acc
      } else {
        return acc.concat(action.substring(1))
      }
    }
    if (action.startsWith('+')) {
      if (!['pharmacist', 'admin'].includes(role)) {
        return acc
      } else {
        return acc.concat(action.substring(1))
      }
    }
    return acc
  }, [])

const getNewStatus = (currentStatus, action) => {
  return statuses[currentStatus].find(([act, status]) => {
    return act.substring(1) === action
  })[1]
}

orders.get('/', verifyToken, async (req, res, next) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1
  })
  return res.json({ orders })
})

orders.get('/:orderId', verifyToken, async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
  if (!order) return res.status(404).json({ error: 'not-found' })
  if (order.status === 'new' && req.user.role === 'pharmacist') {
    order.status = 'seen'
    await order.save()
  }

  const actions = getActions(order.status, req.user.role)

  return res.json({ order, actions })
})

orders.put('/:orderId/:action', verifyToken, async (req, res, next) => {
  const { orderId, action } = req.params
  console.log({ action })
  const order = await Order.findById(orderId)
  const actions = getActions(order.status, req.user.role)

  if (!actions.includes(action)) {
    return res.status(400).json({ error: 'bad-action' })
  }
  const newStatus = getNewStatus(order.status, action)
  console.log({ newStatus })
  order.status = newStatus
  order.history.push({ status: newStatus, date: new Date() })

  await order.save()

  return res.json({ order, actions: getActions(order.status, req.user.role) })
})

orders.patch('/orders/:orderId', verifyToken, async (req, res, next) => {
  const payload = req.body
  const { role } = req.user
  const order = await Order.findById(req.params.orderId)
  if (payload.status && payload.status !== order.status) {
  }
  return res.json({ order })
})

orders.post('/', createOrderValidation, async (req, res, next) => {
  console.log('post order', req.body)
  const wsSessionId = await getWSSessionId(req.body.userId)
  console.log({ wsSessionId })
  const order = await Order.create({
    ...req.body,
    history: [{ status: 'new', date: new Date() }]
  })
  if (wsSessionId) {
    req.app
      .get('websocket')
      .emit('newOrder', { wsSessionId, order: order.toJSON() })
  }
  res.json({ status: 'ok' })
})

export default orders
