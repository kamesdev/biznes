import express from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
import errorGlobal from './utils/errorGlobal.js'
import orderRouter from './routes/orderRouter.js'

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

// Routes
import userRoutes from './routes/userRoutes.js'
import serviceRouter from './routes/serviceRouter.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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