import io from 'socket.io-client'
import uuid from 'uuid'

import { get, del, set } from './redis.js'

const websocket = io('http://localhost:3001/servers')

const KEY = 'wsSessionId'

export const genWSSessionId = async userId => {
  const sessionId = uuid.v4()
  await set(`${KEY}::${userId}`, sessionId)
  return sessionId
}

export const getWSSessionId = userId => get(`${KEY}::${userId}`)

export const delWSSessionId = userId => del(`${KEY}::${userId}`)

export default websocket
