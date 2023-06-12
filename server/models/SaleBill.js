const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleBillSchema = new Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  CustomerId: {
    type: mongoose.Types.ObjectId,
    ref: 'customer',
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  orderDetails:
    [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'product'
        },
        amount: {
          type: Number,
          default: 0
        },
      }
    ],
  updateAt: {
    type: Date,
    default: Date.now
  },
  createAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('saleBill', SaleBillSchema)