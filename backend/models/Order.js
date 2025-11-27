const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered'], default: 'pending' },
  type: { type: String, enum: ['delivery', 'pickup'], required: true },
  address: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);