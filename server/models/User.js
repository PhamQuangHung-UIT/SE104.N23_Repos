const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
  realname: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  },
  telephoneNumber: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
  cart: {
    type: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: 'book'
        },
        amount: {
          type: Number,
          default: '1',
        }
      }
    ],
    default: []
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)