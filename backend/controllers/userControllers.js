import asyncHandler from 'express-async-handler'
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
  });
};

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
  createSendToken(newUser, 201, res);
})

const registerUser = asyncHandler(async (req, res, next) => {
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

  // Create token
  createSendToken(newUser, 201, res);
})

export {
  loginUser,
  registerUser
}