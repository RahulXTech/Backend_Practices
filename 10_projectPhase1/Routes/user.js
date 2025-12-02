const express = require("express");
const router = express.Router();   // ✅ Correct
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleWare.js");
const userController = require("../controllers/user.js")

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs", {title :"simple titile!!!!"});
}); 

router.post("/signup", userController.signup)

router.get("/login", (req, res)=>{
  res.render("users/login.ejs", {title : "simple title of login."})
})

router.post(
  "/login",
  saveRedirectUrl,userController.login
);

router.get("/logout", userController.logout);

module.exports = router;