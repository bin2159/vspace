import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import MongoStore from 'connect-mongo'
// import { initAI } from './pins/init.js'
import { attachAI } from './middlewares/attach.js'
import askRoutes from './routes/ask.js'
import cors from 'cors'

const app = express()
// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow frontend to make requests
    credentials: true // Allow credentials (cookies, authorization headers)
  })
)
app.use(express.json())
app.use(
  session({
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
  })
)

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())
//Attach AI
app.use(attachAI)
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/ai', askRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
