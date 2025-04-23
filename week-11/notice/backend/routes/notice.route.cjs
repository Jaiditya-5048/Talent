const express = require('express');
const router = express.Router();
const { addNotice, deleteNotice, getNotices, editNotice, getNoticesByCategory } = require('../controller/notice.controller.cjs');

router.get('/notices', getNotices);
router.get('/notices/category/:id', getNoticesByCategory);
router.post('/notice', addNotice);
router.patch('/notice/:id', editNotice);
router.delete('/notice/:id', deleteNotice)

module.exports = router;