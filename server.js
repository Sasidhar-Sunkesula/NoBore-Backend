require('dotenv').config()

const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const watchListRoutes = require('./routes/watchList');
const subscriptionRoutes = require('./routes/subscriptions');

// express app
const app = express()


// middleware
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use("/api/watchList", watchListRoutes)
app.use('/api/subscriptions', subscriptionRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })