const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Order = require('../models/Order')
const User = require('../models/User')

/// router DESC: create author

router.post('/', verifyToken, async (req, res) => {

  const { user, books, amount, message } = req.body

  if (!user || !books || !amount || !message)
    return res.status(400).json({ success: false, message: "Thiếu thông tin điền vào từ form" })

  try {
    const newOrder = new Order({
      user: user,
      books: books,
      total: amount,
      message: message
    })

    await newOrder.save()

    res.status(200).json({ success: true, message: "Tạo order thành công!!!", order: newOrder })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

/// router DESC: get all authors

router.get('/getAllUserOrders', verifyToken, async (req, res) => {

  const user = await User.findById(req.userId)
    if (!user)
      return res.status(400).json({ success: false, message: 'Không tìm thấy tài khoản' })

  try {
    const orders = await Order.find().populate()
    res.json({ success: true, orders })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.put('/confirmOrder', verifyToken, async (req, res) => {

  const { orderConfirm } = req.body

  const order = await Order.findById(orderConfirm)
    if (!order)
      return res.status(400).json({ success: false, message: 'Không tìm thấy đơn hàng', orer: orderConfirm })

  try {
    order.status = "Đã xác nhận"

    await order.save()

    const orders = await Order.find().populate()

    return res.json({ success: true,message:" Xác nhận đơn hàng thành công!!!", orders })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.put('/refuseOrder', verifyToken, async (req, res) => {

  const { orderRefuse } = req.body

  const order = await Order.findById(orderRefuse)
    if (!order)
      return res.status(400).json({ success: false, message: 'Không tìm thấy đơn hàng', orer: orderRefuse })

  try {
    order.status = "Từ chối"

    await order.save()

    const orders = await Order.find().populate()
    
    return res.json({ success: true, message: "Từ chối đơn hàng thành công", orders })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

// /// router DESC: update author

// router.put('/:id', verifyToken, async (req, res) => {

//   const { name, description } = req.body
//   if (!name || !description)
//     return res.status(400).json({ success: false, message: "Thiếu thông tin điền vào từ form" })

//   try {
//     let updateCategory = {
//       name: name,
//       description: description
//     }
//     const categoryUpdateCondition = { _id: req.params.id, user: req.userId }
//     updateCategory = await Category.findByIdAndUpdate(
//       categoryUpdateCondition,
//       updateCategory,
//       { new: true }
//     )
//     if (!updateCategory)
//       return res
//         .status(401)
//         .json({
//           success: false,
//           message: "Category not found of User Not Authorized"
//         })

//     res.json({ success: true, message: 'Update Successful!', category: updateCategory })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: "Mạng của bạn có vấn đề" })
//   }
// })

// /// router DESC: delete author

// router.delete('/:id', verifyToken, async (req, res) => {
//   try {
//     const categoryDeleteCondition = { _id: req.params.id, user: req.userId }
//     const deletedCategory = await Category.findOneAndDelete(categoryDeleteCondition)

//     if (!deletedCategory)
//       return res.status(401).json({
//         success: false,
//         message: 'Category Not Found Or User Not Authorised'
//       })

//     res.json({ success: true, message: "Delete Category Succesful!!!", _id: req.params.id })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })

//   }
// })

module.exports = router