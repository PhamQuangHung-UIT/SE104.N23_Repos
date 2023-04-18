const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'account'
    },

    books: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: 'Book'
        },
        amount: {
          type: Number
        },
      }
    ],
    total: {
      type: Number,
      default: 0
    },

    shippingCost: {
      type: Number,
      default: 50000,
    },
    total: {
      type: Number,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String, //-3 giao hang khong thanh cong,  -2 huy, -1 tu choi, 0 cho xac nhan, 1 xac nhan, 2 van chuyen, 3 giao thanh cong, 4 da nhan hang
      default: 'Chờ xác nhận'
    },
    createAt: {
      type: Date,
      default: Date.now
    }
    // voucher: {
    //   code: {
    //     type: String,
    //     uppercase: true
    //   },
    //   discount: {
    //     type: Number,
    //     min: 0
    //   }
    // },
  },
)

module.exports = mongoose.model('order', OrderSchema)
