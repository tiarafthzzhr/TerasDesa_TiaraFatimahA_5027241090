const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    desa: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
