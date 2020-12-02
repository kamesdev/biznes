import AppError from './appError.js'

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 404)
};

const handleDuplicateFieldsDB = (err) => {
    const value = JSON.stringify(err.keyValue)
    const message = `Duplicated field value: ${value}. Please use another value!`
    return new AppError(message, 400)
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data: ${errors.join('. ')}`
    return new AppError(message, 400)
};

const handleJWTError = () => new AppError('Invalid token, Please log in again!', 401)

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again!', 404)

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR: ', err);
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        })
    }
}

const errorGlobal = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else {
        let error = { ...err }

        if(err.name === 'CastError') error = handleCastErrorDB(error)
        if(err.code === 11000) error = handleDuplicateFieldsDB(error)
        if(err.name === 'ValidationError') error = handleValidationErrorDB(error)
        if(err.name === 'JsonWebTokenError') error = handleJWTError()
        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError()

        sendErrorProd(error, res);
    }
}

export default errorGlobal