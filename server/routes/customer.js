const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Customer = require('../models/Customer')

router.post('/', verifyToken, async (req, res) => {
  const { name, email, img, telephoneNumber, address } = req.body

  if (!name || !email || !img || !telephoneNumber || !address)
    return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' })
  try {
    const newCustomer = new Customer({
      name: name,
      email: email,
      img: img,
      telephoneNumber: telephoneNumber,
      address: address
    })

    await newCustomer.save()

    res.json({ success: true, message: 'Tạo khách hàng mới thành công', customer: newCustomer })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  const { name, email, img, telephoneNumber, address } = req.body

  if (!name || !email || !img || !telephoneNumber || !address)
    return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' })
  try {
    let updateCustomer = {
      name: name,
      email: email,
      img: img,
      telephoneNumber: telephoneNumber,
      address: address
    }

    const customerUpdateCondition = { _id: req.params.id }

    updateCustomer = await Customer.findByIdAndUpdate(customerUpdateCondition, updateCustomer, { new: true })

    if (!updateCustomer) {
      return res
        .status(401)
        .json({ success: false, message: 'không tìm thấy khách hàng cần thay đổi hoặc tài khoảng chưa xác thực' })
    }

    res.status(200).json({ success: true, message: 'Cập nhập khách hàng thành công', customer: updateCustomer })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const customerDeleteCondition = { _id: req.params.id }
    let updateCustomer = await Customer.findByIdAndDelete(customerDeleteCondition)

    if (!updateCustomer) {
      return res
        .json(401)
        .json({ success: false, message: 'không tìm thấy khách hàng cần xóa hoặc tài khoản chưa xác thực' })
    }

    res.json({ success: true, message: 'Xóa khách hàng thành công' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.get('/GetAllCustomer', verifyToken, async (req, res) => {
 
  try {
    const customers = await Customer.find()
    
    if(!customers) {
      return res.status(401).json({success: false, message: "Tài khoản chưa xác thực"})
    }

    res.json({ success: true, message: 'Lấy khách hàng thành công', customers: customers })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

module.exports = router