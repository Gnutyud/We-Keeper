const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const uploadController = require("../controllers/uploadController");

router.route("/").post(upload.single('file'), uploadController.uploadFile);

module.exports = router;
