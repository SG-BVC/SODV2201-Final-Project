const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  menuSelections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);