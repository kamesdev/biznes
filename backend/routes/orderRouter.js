import express from 'express'
import { createOrder, getAllOrders, getOrder } from '../controllers/orderController.js'

const router = express.Router({ mergeParams: true });

router.route('/')
    .post(createOrder)
    .get(getAllOrders)

router.route('/:id')
    .get(getOrder)

export default router