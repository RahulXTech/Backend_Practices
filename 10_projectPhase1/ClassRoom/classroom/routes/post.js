const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("get requist for post");
});
router.get("/:id", (req, res)=>{
    res.send("get requies for post id");
});
router.post("/", (req, res)=>{
    res.send("post requies for post");
});

module.exports = router;