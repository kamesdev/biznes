import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({

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
    type: Number,
    default: 0
  },

  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// If using this use default functions not arrow function!

UserSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
}
)


const User = mongoose.model('User', UserSchema)

export default User