import mongoose from 'mongoose'


const PasswordResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Token expires in 1 hour
  }
});

export default mongoose.model('PasswordReset', PasswordResetSchema)