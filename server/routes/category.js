const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Category = require('../models/Category')

/// router DESC: create author

router.post('/', verifyToken, async (req, res) => {
  const { name, description } = req.body
  if (!name || !description )
    return res.status(400).json({ success: false, message: "Thiếu thông tin nhập từ form" })
  try {
    const newCategory = new Category({
      name: name,
      description: description 
    })
    await newCategory.save()
    res.status(200).json({ success: true, message: "Tạo thể loại thành công!!!", category: newCategory })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

/// router DESC: get all authors

router.get('/getAllCategories', verifyToken, async (req, res) => {
  try {
    const categories = await Category.find().populate()
    res.json({ success: true, categories })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

/// router DESC: update author

router.put('/:id', verifyToken, async (req, res) => {

  const { name, description } = req.body
  if (!name || !description)
    return res.status(400).json({ success: false, message: "Thiếu thông tin nhập từ form" })

  try {
    let updateCategory = {
      name: name,
      description: description
    }
    const categoryUpdateCondition = { _id: req.params.id, user: req.userId }
    updateCategory = await Category.findByIdAndUpdate(
      categoryUpdateCondition,
      updateCategory,
      { new: true }
    )
    if (!updateCategory)
      return res
        .status(401)
        .json({
          success: false,
          message: "Không tìm thấy thể loại hoặc tài khoản không xác thực"
        })

    res.json({ success: true, message: 'Cập nhập thành công!', category: updateCategory})

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Mạng của bạn có vấn đề" })
  }
})

/// router DESC: delete author

router.delete('/:id', verifyToken, async(req, res) => {
  try {
    const categoryDeleteCondition = { _id: req.params.id, user: req.userId }
    const deletedCategory = await Category.findOneAndDelete(categoryDeleteCondition)

    if (!deletedCategory)
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy thể loại hoặc tài khoản không xác thực'
      })

      res.json({success: true, message: "Xóa thể loại thành công!!!", _id: req.params.id})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })

  }
})

module.exports = router