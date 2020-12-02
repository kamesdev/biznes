import express from 'express'

const router = express.Router()

import { loginUser, registerUser, protect, myProfile, updatePassword, logout } from '../controllers/userControllers.js'

// import controllers

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', protect, logout)
router.get('/myprofile', protect, myProfile);
router.patch('/updatePassword', protect, updatePassword)

export default router