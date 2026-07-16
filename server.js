const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const bookingRoutes= require('./routes/bookings')
dotenv.config()
const app = express()

app.use(express.json())


const allowedOrigins = [
  "http://localhost:5173",
  "https://eventora-swart.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
//routes
app.get("/", (req, res) => {
    res.send("Eventora Backend is Running 🚀");
});
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