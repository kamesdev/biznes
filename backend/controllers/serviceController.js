import Service from '../models/serviceModel'
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

export {
    createService
}