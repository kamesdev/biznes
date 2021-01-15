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

const getService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id).populate({ path: 'orders' })

    res.status(201).json({
        status: 'success',
        data: {
            data: service
        }
    })
})

// Not for variants !
const updateService = asyncHandler(async (req, res, next) => {
    const updatedService = Service.findByIdAndUpdate(req.params.id, req.body)

    res.status(201).json({
        status: 'success',
        data: {
            data: updatedService
        }
    })
})


export {
    createService,
    getAllServices,
    getService,
    updateService
}