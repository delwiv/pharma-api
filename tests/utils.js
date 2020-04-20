import request from 'supertest'
import expect from 'expect'
import { promises as fs } from 'fs'
import path from 'path'

import server from '../src/index.js'
import User from '../src/models/User.js'
import Order from '../src/models/Order.js'

export const email = 'test@mail.com'
export const password = 'p@ssw0rd'
let token = null

export const cleanDB = () =>
  Promise.all([User.deleteMany({}), Order.deleteMany({})])

export const createTestUser = () => User.create({ email, password })

export const createOrders = async userId => {
  console.log({ userId })
  const orders = JSON.parse(
    await fs.readFile(path.resolve('tests', 'orders.json'))
  ).map(o => ({ ...o, userId }))
  console.log({ orders })
  return Order.create(orders)
}
export const loginTestUser = () =>
  request(server)
    .post('/api/users/login')
    .send({ email, password })
