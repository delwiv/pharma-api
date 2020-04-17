import { promises as fs } from 'fs'
import path from 'path'

import User from './User.js'
import Order from './Order.js'

export default async () => {
  const user = JSON.parse(await fs.readFile(path.resolve('src', 'user.json')))
  const orders = JSON.parse(
    await fs.readFile(path.resolve('src', 'orders.json'))
  )

  console.log('Remove docs')
  await User.deleteMany({})
  await Order.deleteMany({})
  console.log('Insert test data')
  await User.create(user)
  await Order.create(
    orders.map(o => ({
      ...o,
      userId: user._id
    }))
  )

  console.log(`Test data populated:\n 1 user\n ${orders.length} orders`)
}
