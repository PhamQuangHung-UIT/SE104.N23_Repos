const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    default:''
  },
  description: {
    type: String,
    default:''
  },
  category: {
    type: String,
    default:''
  },
  img: {
    type: String,
    default:''
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = mongoose.model('posts', PostSchema)