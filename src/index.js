import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import celebrate from 'celebrate'

import './config/index.js'
import websocket from './utils/websocket.js'
import api from './api/index.js'
import { connect as connectRedis } from './utils/redis.js'
import { connect as connectMongo } from './utils/mongo.js'

const { PORT, NODE_ENV } = process.env

console.log(`env: ${NODE_ENV}`)
const app = express()

app.set('websocket', websocket)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (NODE_ENV === 'test') {
} // console.log = () => {}
else app.use(morgan('dev'))

app.use(cors())

app.use('/api', api)

app.use(celebrate.errors())

const start = async () => {
  await connectRedis()
  connectMongo()

  app.listen(PORT, () => {
    console.log('server listenning on ', PORT)
  })
}

start()

export default app
