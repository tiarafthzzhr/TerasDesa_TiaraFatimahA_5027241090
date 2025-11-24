const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// helper buat bikin token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },                       // payload
    process.env.JWT_SECRET || "secretkey",  // secret dari .env
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

// ================== REGISTER ==================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    // cek email sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // kalau mau langsung kirim token saat register juga bisa:
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    // cek user ada atau tidak
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // generate token
    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
