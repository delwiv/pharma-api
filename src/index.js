import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import api from './api/index.js'
import { connect as connectRedis } from './utils/redis.js'
import { connect as connectMongo } from './utils/mongo.js'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(cors())

app.use('/api', api)

const start = async () => {
  await connectRedis()
  connectMongo()

  app.listen(3003, () => {
    console.log('server listenning on 3003')
  })
}

start()
