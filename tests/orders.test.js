import request from 'supertest'
import expect from 'expect'

import server from '../src/index.js'
import {
  cleanDB,
  createTestUser,
  loginTestUser,
  createOrders
} from './utils.js'

describe('/orders endpoints', () => {
  let token = null
  let userId = null
  let orders = null
  before(async () => {
    await cleanDB()

    const user = await createTestUser()
    userId = user._id
    orders = await createOrders(user.toJSON()._id)
    const res = await loginTestUser()
    token = res.body.token
  })

  it('Fetch my orders', async () => {
    const res = await request(server)
      .get(`/api/orders`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.body.orders).toHaveLength(orders.length)
  })
  it('Fetch one order', async () => {
    const res = await request(server)
      .get(`/api/orders/${orders[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.body.order._id.toString()).toEqual(orders[0]._id.toString())
    expect(res.body.order.items).toHaveLength(orders[0].items.length)
  })
})
