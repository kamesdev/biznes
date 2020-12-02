import express from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
const globalErrorHandler = require('./controllers/errorController');

import { connectDB } from './config/db.js'

dotenv.config()

connectDB();

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name, err.message);
});

// Routes
import userRoutes from './routes/userRoutes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRoutes)

// Must be after all routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'developmnet'

console.log('xdeee')

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