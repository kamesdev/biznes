import AppError from '../utils/appError.js'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'
import Service from '../models/serviceModel'

/* const createOrder = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);
    console.log(service);

    const orderedServices = req.params.serviceId
    const { totalPrice, details,  } = service
    const body = {orderedServices, totalPrice, details}

    const order = await Order.create(body)

}) */