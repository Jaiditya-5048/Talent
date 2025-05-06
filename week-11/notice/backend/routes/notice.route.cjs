/**
 * @swagger
 * /notices/category/{id}:
 *   get:
 *     summary: Get notices by category ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of notices for a category
 */

/**
 * @swagger
 * /notice:
 *   post:
 *     summary: Add a new notice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notice created successfully
 */

/**
 * @swagger
 * /notice/{id}:
 *   patch:
 *     summary: Edit a notice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice updated successfully
 */

/**
 * @swagger
 * /notice/{id}:
 *   delete:
 *     summary: Delete a notice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 */

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