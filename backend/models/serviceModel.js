import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
  provider_service_id: {
    type: Number,
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    //required: true,
  },
  details: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
})

export default mongoose.model('Service', serviceSchema)