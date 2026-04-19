const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const QuizAttempt = require('../models/QuizAttempt');
const Question = require('../models/Question');
const Certificate = require('../models/Certificate');
const { createUniqueCertificateId } = require('../utils/certificateUtils');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { answers } = req.body;
  try {
    const questions = await Question.find();
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers are required' });
    }
    let correct = 0;
    for (const submitted of answers) {
      const question = questions.find(q => q._id.toString() === submitted.questionId);
      if (question && question.answerIndex === submitted.selectedIndex) {
        correct++;
      }
    }
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    const attempt = await QuizAttempt.create({
      user: req.user._id,
      answers,
      score,
      passed,
    });

    let certificate = null;
    if (passed) {
      const certificateId = createUniqueCertificateId();
      certificate = await Certificate.create({
        user: req.user._id,
        userName: req.user.name,
        score,
        passed,
        certificateId,
      });
    }

    res.json({ attempt, certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to record quiz attempt' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(attempts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load attempts' });
  }
});

module.exports = router;
