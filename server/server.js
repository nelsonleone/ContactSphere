const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const { noContentFound, errorHandler } = require('./middlewares/errorMiddlewares')

// Connect to MongoDB (mongoose)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 9000)
    console.log(`Connected To DB!......Server served at port ${process.env.PORT || 9000}`)
  })
  .catch((err) => {
    console.log('Error connecting to the database', err.message)
  })

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



// Auth routes
app.use('/auth',authRoutes)



app.use(noContentFound)
app.use(errorHandler)