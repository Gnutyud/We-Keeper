const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello to we keep api")
})

module.exports = router;