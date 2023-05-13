const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const Account = require('../models/Account')

router.post('/register', async (req, res) => {

  const { account, password } = req.body
  if (!account || !password)
    return res.status(400).json({ success: false, message: 'Thiếu tài khoản hoặc mật khẩu' })

  if (password.length < 6 || account < 6)
    return res.status(400).json({ success: false, message: "Tài khoản và mật khẩu tối thiếu phải có 6 kí tự" })

  try {
    const existingAccount = await Account.findOne({ account: account })
    if (existingAccount)
      return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' })

    const hashedPassword = await argon2.hash(password)
    const newUser = new Account({ account, password: hashedPassword })
    await newUser.save()

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    )

    res.json({ success: true, message: 'Tạo tài khoản thành công', accessToken: accessToken  })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng của bạn có thể có vấn đề' })
  }
})

router.post('/login', async (req, res) => {

  const { account, password } = req.body
  if (!account || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Thiếu tài khoản hoặc mật khẩu' })

  if (password.length < 6 || account < 6)
    return res.status(400).json({ success: false, message: "Tài khoản và mật khẩu tối thiếu phải có 6 kí tự" })

  try {

    const user = await Account.findOne({ account: account })
    if (!user)
      return res.status(400).json({ success: false, message: 'Sai tên đăng nhập' })

    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Mật khẩu chưa đúng' })

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    )

    res.json({ success: true, message: 'Đăng nhập thành công!!!', accessToken: accessToken })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng của bạn có thể có vấn đề' })

  }
})

router.get('/getAllStaffs', async (req, res) => {

  try {
    const staffs = await Account.find({ role: "staff" }).select("-password")
    if (!staffs)
      return res.status(400).json({ success: false, message: 'hiện chưa có nhân viên ' })

    res.json({ success: true, message: 'Lấy nhân viên thành công', staffs: staffs  })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Kết nối mạng của bạn có thể có vấn đề' })
  }
})

module.exports = router