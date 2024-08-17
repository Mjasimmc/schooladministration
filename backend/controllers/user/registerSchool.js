import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../../models/User.js';
import School from '../../models/School.js';

const registerSchool = async (req, res) => {
  try {
    const { email, password, name, role = "admin", schoolName, schoolAddress } = req.body;
    console.log(req.body)
    // Input validation
    if (!email || !password || !name || !role || !schoolName || !schoolAddress) {
      throw new Error('All fields are required');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user document
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role
    });

    // Save the user first
    await newUser.save();

    // Create the school document with an initial reference to the user
    const newSchool = new School({
      name: schoolName,
      address: schoolAddress,
      admin: newUser._id // Reference to the user
    });

    // Save the school
    await newSchool.save();

    // Update the user with the school's reference
    newUser.school = newSchool._id;
    await newUser.save();

    res.status(201).json({
      message: 'User and School created successfully',
      user: newUser,
      school: newSchool
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating user and school:', error);

    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

export default registerSchool;
