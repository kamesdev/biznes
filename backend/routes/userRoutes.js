import express from 'express'

const router = express.Router()

import { loginUser, registerUser } from '../controllers/userControllers.js'

// import controllers

router.post('/login', loginUser)
router.post('/register', registerUser)

export default router