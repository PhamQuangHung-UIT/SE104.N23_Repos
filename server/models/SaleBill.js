const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleBillSchema = new Schema({
  UserID: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  products: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'product',
    }],
    default: ''
  },
  createAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('saleBill', SaleBillSchema)