import mongoose from 'mongoose'

const Order = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'new'
    },
    userId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        name: String,
        price: Number,
        code: String,
        quantity: Number
      }
    ],
    history: [
      {
        status: String,
        date: Date
      }
    ],
    type: String
  },
  { timestamps: true }
)

export default mongoose.model('Order', Order)
