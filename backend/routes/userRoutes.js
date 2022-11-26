const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authByToken } = require('../middleware/auth');

router.route('/')
  .get(authByToken, userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(authByToken, userController.updateUser)
  .delete(authByToken, userController.deleteUser);

router.route('/:userId')
  .get(authByToken, userController.getUser)

module.exports = router;

