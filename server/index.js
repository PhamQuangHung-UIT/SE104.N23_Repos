require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const authorRouter = require('./routes/author')
const categoryRouter = require('./routes/category')
const bookRouter = require('./routes/book')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const commentRouter = require('./routes/comment')

const cors = require('cors')

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@doancndatabase.m9bcrjl.mongodb.net/?retryWrites=true&w=majority`,
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
app.use('/api/posts', postRouter)
app.use('/api/author', authorRouter)
app.use('/api/category', categoryRouter)
app.use('/api/book', bookRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/comment', commentRouter)

app.listen(5000, () => console.log(`server started on port 5000`))