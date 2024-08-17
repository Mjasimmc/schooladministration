import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { validateData } from './validator/customValidator.js';
import connectDB from './config/db.js';
import api from './api.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true, 
};

// Middleware setup
app.use(helmet()); // Security middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

app.use(morgan('dev')); // Logging

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Use API routes
app.use('/api', api);

// Start the server
const startServer = async () => {
    try {
        await connectDB(); // Connect to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
        process.exit(1); // Exit process with failure code if server can't start
    }
};

startServer();
