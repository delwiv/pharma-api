import request from 'supertest'
import expect from 'expect'

import server from '../src/index.js'
import User from '../src/models/User.js'

import {
  cleanDB,
  createTestUser,
  loginTestUser,
  email,
  password
} from './utils.js'

describe('/users endpoints', () => {
  let token = null

  before(cleanDB)

  it('Create test user', async () => {
    const user = await createTestUser()
    expect(user).toHaveProperty('_id')
  })

  it('Login with bad creds', async () => {
    const res = await request(server)
      .post('/api/users/login')
      .send({ email: 'john@mail.com', password: 'whatever' })
    expect(res.statusCode).toBe(404)
  })

  it('Login with good creds', async () => {
    const res = await loginTestUser()
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({
      user: { email, password }
    })
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('wsSessionId')
    token = res.body.token
  })

  it('Fetch /users/me with login token', async () => {
    const res = await request(server)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({
      user: { email, password }
    })
  })
})
