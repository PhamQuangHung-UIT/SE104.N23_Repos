const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  amount: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: '',
  },
  unit: {
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