const { CastError } = require('mongoose').Error;
require('dotenv').config()

const noContentFound = (req,res,next) => {
   const error = new Error(`Content Not Found at - ${req.originalUrl}`)
   res.status(404)
   next(error)
}


const errorHandler = (error,request,response,next) => {
   let statusCode = response.statusCode || 500;
   let message = error.message;

   if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).json({ message: 'Invalid ID format' })
   }

   else if (error instanceof CastError) {
      return response.status(400).json({ message: 'Invalid data type' })
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