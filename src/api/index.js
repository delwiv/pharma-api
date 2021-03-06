import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'

import users from './users/index.js'
import orders from './orders/index.js'
import constants from './constants.js'

const api = express.Router()

api.use('/users', users)
api.use('/orders', orders)
api.use(constants)

export default api
