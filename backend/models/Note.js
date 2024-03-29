const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;