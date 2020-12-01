import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'

dotenv.config()

connectDB();

// Routes
import userRoutes from './routes/userRoutes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'developmnet'


app.listen(PORT, () => {
  console.log(`Listening in ${NODE_ENV} on port ${PORT}`)
})