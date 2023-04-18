const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coverUrl: {
    type: String,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  publishedBy: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  publishedDate: {
    type: String,
    required: true,
  },
  category: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'category'
    }
  ],
  author: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'author'
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment'
    }
  ],

  rating: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0
  },
  
})

module.exports = mongoose.model('book', BookSchema)
