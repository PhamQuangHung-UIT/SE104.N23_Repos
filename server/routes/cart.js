const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Book = require('../models/Book')
const User = require('../models/User')

// @router PUT api/auth/updateCart
// @desc update cart of user
// @access Private

router.put('/addToCart', verifyToken, async (req, res) => {

  const { cartNewItem } = req.body

  if (!cartNewItem) {
    return res
      .status(400)
      .json({ success: false, message: 'Thiếu thông tin nhập vào từ form' })
  }

  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không xác thực" });
    }

    const BookAdd = await Book.findById(cartNewItem)
    if (!BookAdd) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    let bookExist = false;

    user.cart.map((value) => {
      if (value._id == cartNewItem) {
        bookExist = true
      }
    })

    if (bookExist) {
      user.cart.map((value) => {
        if (value._id == cartNewItem) {
          value.amount++
        }
      })
    } else {
      const newCartItem = new Book({
        _id: cartNewItem,
        name: cartNewItem.name,
        coverUrl: cartNewItem.coverUrl,
        description: cartNewItem.description,
        pages: cartNewItem.pages,
        publishedBy: cartNewItem.publishedBy,
        price: cartNewItem.price,
        publishedDate: cartNewItem.publishedDate,
        category: cartNewItem.category,
        author: cartNewItem.author,
      })
      user.cart = [...user.cart, newCartItem]
      user.cart.map((value) => {
        if (value._id == cartNewItem) {
          value.amount++
        }
      })
    }

    await user.save()
    return res.json({ success: true, message: "Thêm sách thành công!!!", user: user })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

router.put('/deleteFromCart', verifyToken, async (req, res) => {

  const { cartDeleteItem } = req.body

  if (!cartDeleteItem) {
    return res
      .status(400)
      .json({ success: false, message: 'Thiếu thông tin nhập vào từ form' })
  }

  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không xác thực" });
    }

    const BookAdd = await Book.findById(cartDeleteItem)
    if (!BookAdd) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    let bookExist = false;

    user.cart.map((value) => {
      if (value._id == cartDeleteItem) {
        bookExist = true
      }
    })

    if (!bookExist) {
      return res.json({ success: false, message: "Sách không tồn tại trong giỏ hàng" })
    } else {

      user.cart.map((value) => {
        if (value._id == cartDeleteItem) {
          if (value.amount > 1) {
            value.amount--
          } else {
            const newCart = user.cart.filter((value) =>
              value._id != cartDeleteItem
            )
            user.cart = newCart
          }
        }
      })
    }

    await user.save()

    return res.json({ success: true, message: "Xóa sách thành công!!!", user: user })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router