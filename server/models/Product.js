const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  productName: {
    type: String,
    default: ''
  },
  amount: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: ''
  },
  unitOfMeasure: {
    type: String,
    default: ''
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  UpdateAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('product', ProductSchema)