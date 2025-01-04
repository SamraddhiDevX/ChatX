const express= require('express');
const protectRoute= require('../middleware/protectRoute');

const { signup, login, logout, updateProfile, checkAuth } = require('../controllers/authcontroller'); // Adjust the path to your file structure

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.post('/logout', logout);

router.get('/check',protectRoute,checkAuth);

module.exports = router;