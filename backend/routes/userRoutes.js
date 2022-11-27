const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authByToken, authByAdminToken } = require('../middleware/auth');

router.route('/')
  .get(authByToken, userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(authByToken, userController.updateUser)
  .delete(authByToken, userController.deleteUser);

router.route('/:userId')
  .get(authByToken, userController.getUser)

router.route('/role')
  .patch(authByAdminToken, userController.updateUserRole)

module.exports = router;

