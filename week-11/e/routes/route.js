const express = require('express');
const router = express.Router();
import { read } from '../controllers/read';
router.get('/' , read )


module.exports = router