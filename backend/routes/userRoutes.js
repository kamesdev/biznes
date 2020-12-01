import express from 'express'

const router = express.Router()

import { loginUser, registerUser, protect, myProfile, updatePassword } from '../controllers/userControllers.js'

// import controllers

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/myprofile', protect, myProfile);
router.patch('/updatePassword', protect, updatePassword)

export default router