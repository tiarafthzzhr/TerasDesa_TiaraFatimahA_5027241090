const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");


// konfigurasi upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/products
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, price, unit, desa, location } = req.body;

    if (!title || !category || !price || !unit || !desa || !location) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const product = await Product.create({
      title,
      category,
      price,
      unit,
      desa,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    return res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      product,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
