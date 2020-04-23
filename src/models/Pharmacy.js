import mongoose from 'mongoose'

export const PharmacySchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    zipcode: String,
    city: String,
    lng: Number,
    lat: Number
  },
  { timestamps: true }
)

export default mongoose.model('Pharmacy', PharmacySchema)
