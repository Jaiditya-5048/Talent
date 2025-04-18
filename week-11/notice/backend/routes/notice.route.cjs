const express = require('express');
const noticeRouter = express.Router();
const { addNotice, deleteNotice, getNotices } = require('../controller/notice.controller.cjs');

noticeRouter.get('/', getNotices);
noticeRouter.post('/', addNotice);
noticeRouter.delete('/:id', deleteNotice)

module.exports = noticeRouter;