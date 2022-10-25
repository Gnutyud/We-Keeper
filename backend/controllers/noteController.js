const Note = require('../models/Note');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc get all notes
// @route GET /notes
// @access Private 
const getNotes = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: 'userId is required' })
  // Get all notes from moongose DB
  const notes = await Note.find({ userId }).lean();

  if (!notes?.length) {
    return res.status(200).json([]);
  }

  // Add username to each note before sending the response 
  const notesWithUser = await Promise.all(notes.map(async (note) => {
    const user = await User.findById(note.userId).lean().exec()
    return { ...note, username: user.username }
  }))

  res.json(notesWithUser)
});

// @desc create a note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { userId, title, text, color } = req.body;

  if (!userId || !title || !text) {
    return res.status(400).json({ message: 'All fields are required!' })
  }

  // check duplicate title
  const titleDuplicate = await Note.findOne({ title }).lean().exec();
  if (titleDuplicate) {
    return res.status(409).json({ message: 'Title already exist!' })
  }

  // create and store Note
  let note;
  if (color) {
    note = await Note.create({ userId, title, text, color });
  } else {
    note = await Note.create({ userId, title, text });
  }
  if (note) {
    return res.status(201).json({ message: 'Successfully create note' })
  } else {
    return res.status(400).json({ message: 'Invalid note data received' })
  }
});

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, userId, title, text, color } = req.body

  // Confirm data
  if (!id || !userId || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Confirm note exists to update
  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not found' })
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec()

  // Allow renaming of the original note 
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate note title' })
  }

  note.userId = userId
  note.title = title
  note.text = text
  note.color = color

  const updatedNote = await note.save()

  res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'Note ID required' })
  }

  // Confirm note exists to delete 
  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not found' })
  }

  const result = await note.deleteOne()

  const reply = `Note '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getNotes,
  createNewNote,
  updateNote,
  deleteNote
}