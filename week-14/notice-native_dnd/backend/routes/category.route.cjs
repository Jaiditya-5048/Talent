/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */

const express = require('express');
const router = express.Router();
const { addCategory, getCategory, deleteCategory } = require('../controller/category.controller.cjs');

router.get('/category', getCategory);
router.post('/category', addCategory);
// router.patch('/notice/:id', editNotice);
router.delete('/category/:id', deleteCategory)

module.exports = router;