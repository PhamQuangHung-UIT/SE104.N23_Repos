require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')

const cors = require('cors')

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@doandatabasename.wqxftfr.mongodb.net/?retryWrites=true&w=majority`,
    )
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const app = express()

app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.json())
app.use('/api/auth', authRouter)
//app.use('/api/posts', postRouter)


app.listen(5000, () => console.log(`server started on port 5000`))