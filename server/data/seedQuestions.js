const Question = require('../models/Question');

const sampleQuestions = [
  {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answerIndex: 2,
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    answerIndex: 1,
  },
  {
    text: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answerIndex: 3,
  },
  {
    text: 'Which language is primarily used for styling web pages?',
    options: ['JavaScript', 'CSS', 'Python', 'Java'],
    answerIndex: 1,
  },
  {
    text: 'What does HTML stand for?',
    options: [
      'HyperText Markup Language',
      'HighText Machine Language',
      'Hyperlinks Text Markup Language',
      'HyperText Markdown Language',
    ],
    answerIndex: 0,
  },
];

const seedQuestions = async () => {
  const count = await Question.countDocuments();
  if (count === 0) {
    await Question.insertMany(sampleQuestions);
    console.log('Sample questions seeded');
  }
};

module.exports = seedQuestions;
