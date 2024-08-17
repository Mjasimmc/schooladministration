
// models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  name: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'headteacher'],
    default: 'admin'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
