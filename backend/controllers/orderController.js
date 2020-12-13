import AppError from '../utils/appError.js'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Service from '../models/serviceModel.js'

const createOrder = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);

    let serviceVariant;
    service.variants.map(el => {
        if(el.amount === req.body.amount) serviceVariant = el;
    })

    const orderedServices = req.params.serviceId
    const { price, details } = serviceVariant
    const { email, amount } = req.body
    const body = {orderedServices, price, details, email, amount}
    
    const order = await Order.create(body)

    res.status(201).json({
        status: 'success',
        data: {
            data: order
        }
    })
})

const getAllOrders = asyncHandler(async (req, res, next) => {
    let filter = {}
    if(req.params.serviceId) filter = {orderedServices: req.params.serviceId} 
    const orders = await Order.find(filter) 

    res.status(201).json({
        status: 'success',
        data: {
            data: orders
        }
    })
})

const getOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    res.status(201).json({
        status: 'success',
        data: {
            data: order
        }
    })
})

export {
    createOrder,
    getAllOrders,
    getOrder
}