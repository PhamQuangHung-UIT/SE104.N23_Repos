const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'Book'
  },
  account: {
    type: String,
    default: ''
  },
  userImage: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  createAt: {
    type: Date,
    default: Date.now
  }
  // rating: {
  //   type: Number
  // },
})

module.exports = mongoose.model('comment', CommentSchema)
