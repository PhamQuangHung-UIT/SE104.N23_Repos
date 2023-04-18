const mongoose = require('mongoose')
const VoucherSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  code: {
    type: String,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    min: 0
  },
  minSpend: {
    type: Number,
    min: 0,
    default: 0
  },
  used: {
    type: Number,
    min: 0,
    default: 0
  }
})
module.exports = mongoose.model('Voucher', VoucherSchema)