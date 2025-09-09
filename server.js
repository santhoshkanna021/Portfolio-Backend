// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRouter = require('./routers/contact');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Health Check
app.get('/', (req, res) => {
  res.send('✅ API is running.');
});

// ✅ Routes
// It's better to prefix API routes (e.g., /api)
app.use('/api/contact', contactRouter);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
