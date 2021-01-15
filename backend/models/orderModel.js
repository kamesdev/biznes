import mongoose from 'mongoose'
import validator from 'validator'
//import Service from './serviceModel.js'

const orderSchema = mongoose.Schema({
  orderedServices: {
      type: mongoose.Schema.ObjectId,
      ref: 'Service',
      required: [true, 'Must belong to service']
  },
  details: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
    //required: true,
  },
  /* paidAt: {
    type: Date.now() // wywala blad!
  }, */
  paymentMethod: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  amount: {
    type: Number,
    required: true
  },
  price: Number
 /*  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  }, */
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'orderedServices',
    select: 'name image category'
  })
  next()
})

export default mongoose.model('Order', orderSchema)