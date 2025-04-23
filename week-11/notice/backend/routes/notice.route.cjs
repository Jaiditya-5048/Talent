const express = require('express');
const router = express.Router();
const { addNotice, deleteNotice, getNotices, editNotice } = require('../controller/notice.controller.cjs');

router.get('/notices', getNotices);
router.post('/notice', addNotice);
router.patch('/notice/:id', editNotice);
router.delete('/notice/:id', deleteNotice)

module.exports = router;