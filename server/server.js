const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const attemptRoutes = require('./routes/attempts');
const certificateRoutes = require('./routes/certificates');
const seedQuestions = require('./data/seedQuestions');

dotenv.config();
const app = express();
app.use(cors({
  origin: "https://quiz-engine-two.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

connectDb().then(async () => {
  await seedQuestions();
}).catch(err => {
  console.error('Database connection failed', err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
  res.send({ status: 'OK', message: 'Quiz Engine API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
