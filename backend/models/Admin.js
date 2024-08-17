// models/Admin.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
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
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
