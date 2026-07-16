const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const bookingRoutes= require('./routes/bookings')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
//routes
app.use('/api/auth', authRoutes) 
app.use('/api/events',eventRoutes)
app.use('/api/bookings',bookingRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})