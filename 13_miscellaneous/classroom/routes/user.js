const express = require("express")
const router = express.Router();


router.get("/", (req, res)=>{
    res.send("get requist for user");
});
router.get("/:id", (req, res)=>{
    res.send("get requist for user id");
});
router.post("/", (req, res)=>{
    res.send("post requist for user");
});

module.exports = router;