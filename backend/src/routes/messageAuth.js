const express= require('express');
const protectRoute= require('../middleware/protectRoute');

const {  getUserSidebar,getUserMessages,sendMessage } = require('../controllers/messagecontroller'); // Adjust the path to your file structure

const router = express.Router();


router.get('/user',protectRoute,getUserSidebar);
router.get('/:id',protectRoute,getUserMessages);
router.post('/send/:id',protectRoute,sendMessage)


module.exports = router;