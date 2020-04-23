import express from 'express'

import { statuses } from '../utils/constants.js'

const constants = express.Router()

constants.get('/statuses', (req, res, next) => {
  res.json({ statuses })
})

export default constants
