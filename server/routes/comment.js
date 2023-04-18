const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Comment = require('../models/Comment')

/// router DESC: create author

router.post('/', verifyToken, async (req, res) => {

  const { book, account, userImage, content } = req.body

  if (!book || !account || !userImage || !content)
    return res.status(400).json({ success: false, message: "Thiếu thông tin điền vào từ form" })

  try {
    const newComment = new Comment({
      book: book,
      account: account,
      userImage: userImage,
      content: content
    })
    await newComment.save()
    res.status(200).json({ success: true, message: "Tạo comment thành công!!!", newComment: newComment })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề!' })
  }
})

/// router DESC: get all authors

router.get('/getAllContents', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.find().populate()
    res.json({ success: true, comment: comment })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề!' })
  }
})

module.exports = router