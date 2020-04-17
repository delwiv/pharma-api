import mongoose from 'mongoose'
import { promises as fs } from 'fs'
import path from 'path'

const User = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    premium: Boolean,
    pharmacy: {
      name: String,
      address: String,
      zipcode: String,
      city: String,
      geoLng: Number,
      geoLat: Number
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', User)
