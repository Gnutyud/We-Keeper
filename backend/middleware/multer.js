const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Set storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirName = path.join(process.cwd(), "./uploadFiles/");
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
