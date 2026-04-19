const express = require('express');
const Question = require('../models/Question');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find().select('-answerIndex');
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load questions' });
  }
});

module.exports = router;
