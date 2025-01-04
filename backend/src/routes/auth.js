import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/authcontroller.js'; // Adjust the path to your file structure

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.post('/logout', logout);

router.get('/check', protectRoute, checkAuth);

export default router;
