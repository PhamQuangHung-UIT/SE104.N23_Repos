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
  fullname: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  sex: {
    type: String,
    default: '',
  },
  birthDay: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  telephoneNumber: {
    type: String,
    default: '',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'staff'
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