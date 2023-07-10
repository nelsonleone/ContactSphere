const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const contactsHandlerRoutes = require('./routes/contactsHandlerRoutes')
const { noContentFound, errorHandler } = require('./middlewares/errorMiddlewares')
const corsOptions = {
  origin: process.env.FRONTEND_APP_URL ,
  optionsSuccessStatus: 200, 
  credentials: true
}


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
  }
)

// Middlewares
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))



// Auth Route
app.use('/server/auth',authRoutes)


// Contacts Route
app.use('/server/contacts',contactsHandlerRoutes)



app.use(noContentFound)
app.use(errorHandler)