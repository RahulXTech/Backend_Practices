const express = require("express");
const router = express.Router();   // ✅ Correct

router.get("/signup", (req, res) => {
  res.send("Form!!!");
});

module.exports = router;