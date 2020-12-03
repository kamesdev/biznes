import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  orderedServices: {
    product: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    }
  },
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
    //required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paidAt: {
    type: Date.now(),
  },
  paymentMethod: {
    type: String,
    //required: true,
  },
 /*  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  }, */
})

orderSchema.virtual('service', {
  ref: 'Service',
  foreignField: 'order',
  localField: '_id'
});

export default mongoose.model('Order', orderSchema)