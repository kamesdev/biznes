import asyncHandler from 'express-async-handler'

// import models
import User from '../models/userModel.js'


const loginUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;

  if (!(email && password)) {
    return res.json({message: 'Fill in all fields'})
    // throw new Error('Fill in all fields')
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.json({message: 'Wrong credentials'})
  }

  // if (!(await bcrypt.compare(password, user.password))) {
  //   return res.json({message: 'Wrong credentials'})
  // }
  console.log(email, password)
  if (!await user.matchPassword(password)) {
    return res.json({message: 'Wrong credentails'})
  }

 res.json({message: 'Logged in', user: user})

})



const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, confirmPassword } = req.body

  if (!(name && email && password && confirmPassword)) {
    console.log('Fill in all fields')
    return res.json({message: 'Fill in all fields'})
  }

  if (password !== confirmPassword) {
    return res.json({message: 'Password doesnt match!'})
  }

  const emailExists = await User.findOne({email})

  if (emailExists) {
    return res.json({message: 'This email is already taken!'})
  }

  // Saving user

  const newUser = {
    name,
    email,
    password
  }

  const user = await User.create(newUser)

  res.json({success: 'User created!', user: user})

})

export {
  loginUser,
  registerUser
}