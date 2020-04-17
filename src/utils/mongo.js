import mongoose from 'mongoose'

export const connect = () => {
  mongoose.connect('mongodb://localhost:27017/pharma', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
