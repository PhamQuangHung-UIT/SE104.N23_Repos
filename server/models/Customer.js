const mongoose = require('mongoose')
const schema = mongoose.Schema

const CustomerSchema = new schema({
  name: {
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
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('customer', CustomerSchema)