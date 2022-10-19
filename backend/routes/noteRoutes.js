const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { authByToken } = require('../middleware/auth');

router.route('/')
  .get(authByToken, noteController.getAllNotes)
  .post(authByToken, noteController.createNewNote)
  .patch(authByToken, noteController.updateNote)
  .delete(authByToken, noteController.deleteNote)

  module.exports = router;