import express from 'express'
import { createOrder, getAllOrders } from '../controllers/orderController.js'

const router = express.Router({ mergeParams: true });

router.route('/')
    .post(createOrder)
    .get(getAllOrders)

export default router