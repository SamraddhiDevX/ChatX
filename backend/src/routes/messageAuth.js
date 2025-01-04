import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserSidebar, getUserMessages, sendMessage } from '../controllers/messagecontroller.js'; // Adjust the path to your file structure

const router = express.Router();

router.get('/user', protectRoute, getUserSidebar);
router.get('/:id', protectRoute, getUserMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
