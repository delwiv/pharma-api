import mongoose from 'mongoose'

import { PharmacySchema } from './Pharmacy.js'

const User = new mongoose.Schema(
  {
    role: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    premium: Boolean,
    pharmacy: PharmacySchema
  },
  { timestamps: true }
)

export default mongoose.model('User', User)
