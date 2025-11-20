const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  eventType: { type: String, enum: ['dining', 'birthday', 'corporate'], default: 'dining' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  specialNotes: { type: String }
}, { timestamps: true });

reservationSchema.index({ date: 1, time: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);