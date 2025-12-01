const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['starters', 'mains', 'desserts', 'beverages'], required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
  dietary: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);