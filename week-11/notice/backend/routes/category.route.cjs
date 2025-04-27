const express = require('express');
const router = express.Router();
const { addCategory, getCategory, deleteCategory } = require('../controller/category.controller.cjs');

router.get('/category', getCategory);
router.post('/category', addCategory);
// router.patch('/notice/:id', editNotice);
router.delete('/category/:id', deleteCategory)

module.exports = router;