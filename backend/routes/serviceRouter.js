import express from 'express'
/* import protect from '../controllers/userControllers.js' */
import orderRouter from './orderRouter.js'
import {createService, getAllServices, getService} from '../controllers/serviceController.js'

const router = express.Router()

router.use('/:serviceId/order', orderRouter)

router.route('/')
    .post(createService)
    .get(getAllServices)

router.route('/:id')
    .get(getService)

/* router.route('/')
    .get(getAllServices)
    .post(protect, createService)

router.route('/:id')
    .get(getService)
    .patch(protect, createService)
    .delete(protect, deleteTour) */

    export default router