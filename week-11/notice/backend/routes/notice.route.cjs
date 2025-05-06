const express = require('express');
const router = express.Router();
const { addNotice, deleteNotice, getNotices, editNotice, getNoticesByCategory, editOrder } = require('../controller/notice.controller.cjs');

// router.get('/notices', getNotices);
router.get('/notices/category/:id', getNoticesByCategory);
router.post('/notice', addNotice);
router.patch('/notice/:id', editNotice);
router.patch('/notices/order', editOrder);
router.delete('/notice/:id', deleteNotice)

module.exports = router;