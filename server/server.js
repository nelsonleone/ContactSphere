const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')

// connect to mongodb (mongoose) 
mongoose.connect(process.env.MONGODB_URI,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then((conn)  => {
   console.log(`Connected To DB.......Server running on port ${conn.connection.port}`)
   app.listen(process.env.PORT || 9000)
}).catch((err) => {
   console.log('Error connecting to database', err.message)
})



// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser)