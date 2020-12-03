import express from 'express'
import protect from '../controllers/userControllers'
import createService from '../controllers/serviceController'

const router = express.Router()

///router.use('/:serviceId/order', orderRouter)

router.route('/')
    .post(createService)

/* router.route('/')
    .get(getAllServices)
    .post(protect, createService)

router.route('/:id')
    .get(getService)
    .patch(protect, createService)
    .delete(protect, deleteTour) */

    export default router