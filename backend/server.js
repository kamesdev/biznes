import express from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
import errorGlobal from './utils/errorGlobal.js'
import orderRouter from './routes/orderRouter.js'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/db.js'

dotenv.config()

console.log('test')
console.log('test2')

connectDB();

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!');
  if(process.env.NODE_ENV==='developmnet') {
    console.log(err)
    } else {
      console.log(err.name)
    } 
});

import userRoutes from './routes/userRoutes.js'
import serviceRouter from './routes/serviceRouter.js'
const app = express()

// Set security HTTP
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/users', userRoutes)
app.use('/services', serviceRouter)
app.use('/orders', orderRouter)

// Must be after all routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(errorGlobal);

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'developmnet'

app.listen(PORT, () => {
  console.log(`Listening in ${NODE_ENV} on port ${PORT}`)
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
      process.exit(1);
  });
});