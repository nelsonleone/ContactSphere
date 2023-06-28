const { CastError } = require('mongoose').Error;
require('dotenv').config()

const noContentFound = (req,res,next) => {
   const error = new Error(`Content Not Found at - ${req.originalUrl}`)
   res.status(404)
   next(error)
}


const errorHandler = (error,request,response,next) => {
   let statusCode = response.statusCode === 200 ? 500 : response.statusCode;
   let message = error.message;

   if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).json({ message: 'Invalid ID format' })
    return;
   }

   if (error instanceof CastError) {
     response.status(400).json({ message: 'Invalid data type' })
     return;
   }

   response.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
   })
}

module.exports = {
   noContentFound,
   errorHandler
}