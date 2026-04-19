const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ questionId: String, selectedIndex: Number }],
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
