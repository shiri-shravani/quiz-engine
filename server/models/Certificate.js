const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  certificateId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', certificateSchema);
