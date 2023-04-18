const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Book = require('../models/Book')

/// router DESC: create author

router.post('/', verifyToken, async (req, res) => {
  const { name, coverUrl, description, pages, publishedBy, price, publishedDate, category, author } = req.body
  if (!name || !coverUrl || !description || !pages || !publishedBy || !price || !publishedDate || !category || !author)
    return res.status(400).json({ success: false, message: "Thiếu thông tin nhập vào từ form" })
  try {
    const newBook = new Book({
      name: name,
      coverUrl: coverUrl,
      description: description,
      pages: pages,
      publishedBy: publishedBy,
      price: price,
      publishedDate: publishedDate,
      category: category,
      author: author,
    })
    await newBook.save()
    res.status(200).json({ success: true, message: "Tạo sách thành công!!!", book: newBook })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng có vấn đề', error: error })
  }
})

/// router DESC: get all authors

router.get('/getAllBooks', verifyToken, async (req, res) => {
  try {
    const books = await Book.find().populate()
    res.json({ success: true, books })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng có vấn đề' })
  }
})

/// router DESC: update author

router.put('/:id', verifyToken, async (req, res) => {
  const { name, coverUrl, description, pages, publishedBy, price, publishedDate, category, author } = req.body
  if (!name || !coverUrl || !description || !pages || !publishedBy || !price || !publishedDate || !category || !author)
    return res.status(400).json({ success: false, message: "Thiếu thông tin nhập vào từ form" })
  try {
    let updateBook = {
      name: name,
      coverUrl: coverUrl,
      description: description,
      pages: pages,
      publishedBy: publishedBy,
      price: price,
      publishedDate: publishedDate,
      category: category,
      author: author,
    }
    const bookUpdateCondition = { _id: req.params.id, user: req.userId }
    updateBook = await Book.findByIdAndUpdate(
      bookUpdateCondition,
      updateBook,
      { new: true }
    )
    if (!updateBook)
      return res
        .status(401)
        .json({
          success: false,
          message: "Không tìm thấy sách hoặc tài khoản không xác thực"
        })

    res.json({ success: true, message: 'Cập nhập sách thành công!!!', book: updateBook })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Kết nối mạng có vấn đề", error: error })
  }
})

/// router DESC: delete author

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const bookDeleteCondition = { _id: req.params.id, user: req.userId }
    const deletedBook = await Book.findOneAndDelete(bookDeleteCondition)

    if (!deletedBook)
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy sách hoặc tài khoản không xác thực'
      })

    res.json({ success: true, message: "Xóa sách thành công!!!", _id: req.params.id })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng có vấn đề' })

  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {

    const book = await Book.findById(req.params.id)

    if (!book)
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy sách!'
      })
      
    return res.json({ success: true, message: "Thấy rồi!", book: book })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng có vấn đề' })

  }
})

module.exports = router