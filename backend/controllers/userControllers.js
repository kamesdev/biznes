import asyncHandler from 'express-async-handler'
import { promisify } from 'util'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'

// import models
import User from '../models/userModel.js'

const signToken = userID => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
  };
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
      status: "success",
      token,
      data:  {
          user
      } 
  })
}

const loginUser = asyncHandler(async (req, res, next) => {
 const { email, password } = req.body;

  if (!(email && password)) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password'), 401);
  }

  // send token
  createSendToken(user, 201, res)
})

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body

  if (!(name && email && password && passwordConfirm)) {
    return next(new AppError('Enter all data!', 401))
  }

  if (password !== passwordConfirm) {
    return next(new AppError('Invalid passwords!', 401))
  }

  const emailExists = await User.findOne({email})

  if (emailExists) {
    return next(new AppError('This email is already taken', 401))
  }

  // Saving user
  const newUser = {
    name,
    email,
    password,
    passwordConfirm
  }

  const user = await User.create(newUser)

  // Create token
  createSendToken(user, 201, res);
})

// osoby nie zalogowane nie beda mialy dostepu do requestu np do URL/user/myprofile
const protect = asyncHandler(async (req, res, next) => {
   // 1) Getting token and check if it's there
   let token
   if(req.headers.authorization  && req.headers.authorization.startsWith('Bearer')) {
       token = req.headers.authorization.split(' ')[1]
   };

   if(!token) {
       return next(new AppError('You are not log in! Please log in to get acces', 401))
   }

   // 2) Verification token
   const decoded =  await promisify(jwt.verify)(token, process.env.JWT_SECRET)

   // 3) Check if user still exists
   const freshUser = await User.findById(decoded.id)
   if(!freshUser) {
       return next(new AppError('The user belonging to this token does no longer exist'), 401)
   }

  // narazie nie potrzebne
   /* // 4) Check if user changed password after the token was issued
   if (freshUser.changedPasswordAfter(decoded.iat)) {
       return next(new AppError('User recently changed password! Please log in again'), 401)
   }
  */
   // Grant access to protected route
   req.user = freshUser // sends to the next middleware (restrictTo) req.user 
   next()
})

// Test dla protect
const myProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.user
  res.json({
    data: {
      name,
      email
    }
  })
})

const updatePassword = asyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  // req.user from protect 
  const user = await User.findById(req.user.id).select('+password')
 
  // 2) Check if posted password is correct
  if(!(await user.matchPassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError('Incorrect password', 401))
  }

  // 3) If is correct, update password
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  // 4) Log user in, send JWT
  createSendToken(user, 200, res)
});

export {
  loginUser,
  registerUser,
  protect,
  myProfile,
  updatePassword
}