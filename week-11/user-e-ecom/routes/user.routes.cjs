  const express = require('express');
  const userRouter = express.Router();
const { addUser, checkEmail } = require('../controller/user.controller.cjs');


userRouter.post('/user', addUser);
userRouter.post('/check-email', checkEmail)

module.exports = userRouter;
