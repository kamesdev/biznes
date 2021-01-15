import mongoose from 'mongoose'

/* const serviceSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
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
  timestamps: true
}) */

/* serviceSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'orderedServices',
  localField: '_id'
}); */

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    //required: true,
  },
  category: {
    type: String,
    required: true,
  },
  variants: [
    {
      price: {
        type: Number,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
      provider_service_id: {
        type: Number,
        //required: true,
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

serviceSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'orderedServices',
  localField: '_id'
})

export default mongoose.model('Service', serviceSchema)