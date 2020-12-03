import AppError from '../utils/appError.js'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Service from '../models/serviceModel.js'

const createOrder = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);

    const orderedServices = req.params.serviceId
    const { totalPrice, details,  } = service
    const { email } = req.body
    const body = {orderedServices, totalPrice, details, email}

    const order = await Order.create(body)

    res.status(201).json({
        status: 'success',
        data: {
            data: order
        }
    })
})

const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find()

    res.status(201).json({
        status: 'success',
        data: {
            data: orders
        }
    })
})

export {
    createOrder,
    getAllOrders
}