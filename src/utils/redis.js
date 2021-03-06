import ioredis from 'ioredis'

// import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '../config.json'

const SEVEN_DAYS = 60 * 60 * 24 * 7 // 7 days
const TWO_DAYS = 60 * 60 * 24 * 2
const REDIS_HOST = 'localhost'

let redis = null

export const connect = async () => {
  console.log(`Connection to redis://${REDIS_HOST}...`)
  redis = await ioredis.createClient({
    host: REDIS_HOST
  })
  console.log('Connected to redis')
}

export const set = async (key, data, expire = SEVEN_DAYS, title = 'data') => {
  await redis.hmset(
    key,
    title,
    typeof data === 'object' ? JSON.stringify(data) : data
  )
  await redis.expire(key, expire)
}

export const rearm = (key, expire = TWO_DAYS) => redis.expire(key, expire)

export const get = async (key, title = 'data') => {
  const data = await redis.hget(key, title)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

export const del = (key, title = 'data') => {
  return redis.hdel(key, title)
}

export default redis
