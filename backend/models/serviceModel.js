import mongoose from 'mongoose'

const ServiceModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [],
  balance: {
    default: 0
  }
})

// "service": 2,
// "name": "Comments",
// "type": "Custom Comments",
// "category": "Second Category",
// "rate": "8",
// "min": "10",
// "max": "1500"

export default mongoose.model('User', ServiceModel)