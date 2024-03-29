const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
});
const UploadModel = mongoose.model("Upload", UploadSchema);

module.exports = UploadModel;
