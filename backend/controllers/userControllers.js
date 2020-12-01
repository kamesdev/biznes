import asyncHandler from 'express-async-handler'
import AppError from './../utils/appError'

// import models
import User from '../models/userModel.js'


const loginUser = asyncHandler(async (req, res, next) => {
 const { email, password } = req.body;

  if (!(email && password)) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'), 401);
};

  // if (!(await bcrypt.compare(password, user.password))) {
  //   return res.json({message: 'Wrong credentials'})
  // }
  /*   console.log(email, password)
  if (!await user.matchPassword(password)) {
    return res.json({message: 'Wrong credentails'})
  } */
  
  // send token
 res.json({message: 'Logged in', user: user})

})

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, passwordConfirm } = req.body

  if (!(name && email && password && passwordConfirm)) {
    return next(new AppError('message', 401))
  }

  if (password !== passwordConfirm) {
    return next(new AppError('message', 401))
  }

  const emailExists = await User.findOne({email})

  if (emailExists) {
    return next(new AppError('message', 401))
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