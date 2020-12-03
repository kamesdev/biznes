import Service from '../models/serviceModel.js'
import asyncHandler from 'express-async-handler'

const createService = asyncHandler(async (req, res, next) => {
    const service = await Service.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: service
        }
    })
})

const getAllServices = asyncHandler(async (req, res, next) => {
    const services = await Service.find()

    res.status(201).json({
        status: 'success',
        data: {
            data: services
        }
    })
})

export {
    createService,
    getAllServices
}