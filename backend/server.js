require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const MongoStore = require('connect-mongo');
const {attachAI} = require('./pins/ai');
const aiRoutes = require('./routes/ai');
const cors = require('cors');
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow frontend to make requests
  credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
//Attach AI
app.use((req, res, next) => {
  attachAI(req)
  next()
})
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ask', aiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
