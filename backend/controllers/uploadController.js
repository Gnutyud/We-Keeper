const Upload = require("../models/Upload");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

// @desc upload file
// @route POST /upload
// @access Private
const uploadFile = asyncHandler(async (req, res, next) => {
  const files = req.file;
  console.log("req", req.file);
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  // check duplicate filename
  const duplicateFileName = await Upload.findOne({ filename: files.originalname }).lean().exec();
  if (duplicateFileName) {
    return res.status(200).json({ url: duplicateFileName.imageBase64 });
  }
  // convert images into base64 encoding
  let imgBase64 = fs.readFileSync(files.path).toString("base64");

  // create object to store data in the collection
  let finalImg = {
    filename: files.originalname,
    contentType: files.mimetype,
    imageBase64: imgBase64,
  };

  let newUpload = await Upload.create(finalImg);
  if (newUpload) {
    res.status(200).json({ url: imgBase64 });
  } else {
    res.status(400).json({ message: "Invalid file upload data received" });
  }
});

module.exports = { uploadFile };
