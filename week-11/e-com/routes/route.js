const express = require('express');
const router = express.Router();
const { read } = require('../controllers/read');
const { addUser } = require('../controllers/user.control');

router.get('/', read);
router.post('/user', addUser);

module.exports = router;
