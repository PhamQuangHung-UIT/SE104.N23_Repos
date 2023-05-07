const mongoose = require('mongoose')
const schema = mongoose.Schema

const AccountSchema = new schema({
  account: {
    type: String,
    default: ''
  },
  password: {
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

module.exports = mongoose.model('account', AccountSchema)