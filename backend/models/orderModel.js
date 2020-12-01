import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  
  quantity: {
  
  },

  isPaid: {
    default: false
  },

  paidAt: {
    type: Date,
  },

  link: {
    type: String,
    required: true,
  }

})

export default mongoose.model('User', OrderSchema)