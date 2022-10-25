const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { authByToken } = require('../middleware/auth');

router.route('/')
  .post(authByToken, noteController.createNewNote)
  .patch(authByToken, noteController.updateNote)

router.route('/:userId')
  .get(authByToken, noteController.getNotes)

router.route('/:id')
  .delete(authByToken, noteController.deleteNote)

module.exports = router;