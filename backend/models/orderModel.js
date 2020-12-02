import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  orderedServices: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    }
  ],
  details: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
  paidAt: {
    type: Date.now(),
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
})

export default mongoose.model('Order', orderSchema)