const express = require('express');
const noticeRouter = express.Router();
const { addNotice, deleteNotice, getNotices } = require('../controller/notice.controller.cjs');

noticeRouter.get('/notice', getNotices);
noticeRouter.post('/notice', addNotice);
noticeRouter.delete('/notice/:id', deleteNotice)

module.exports = noticeRouter;