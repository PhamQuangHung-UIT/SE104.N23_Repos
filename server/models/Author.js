const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    require: true
  },
  birthDate: {
    type: String,
    required: true
  },
  books: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'book'
      }
    ],
    default: []
  },
})

module.exports = mongoose.model('author', AuthorSchema)
