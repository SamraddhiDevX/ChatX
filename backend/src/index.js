import express from 'express';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messageAuth.js';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from "./lib/socket.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(bodyParser.json({ limit: '500mb' })); // Increase the limit
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// Serve frontend in production mode
const PORT = process.env.PORT || 5000;  // Add fallback port

// Resolve the frontend dist folder relative to the current file's location
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
console.log('Frontend dist path:', frontendDistPath);  // Ensure this path is correct

// Serve static files from the dist folder
app.use(express.static(frontendDistPath));

// Serve the index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log('server is running');
  connectDB();
});
