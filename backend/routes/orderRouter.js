import express from 'express'

const router = express.Router({ mergeParams: true });

router.route('/')
    .post(createOrder)