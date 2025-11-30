const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError");
const { title } = require("process");
const MONGO_URL = "mongodb://localhost:27017/wanderlust";
const {listingSchema, reviewSchema} = require("./schema");
// const Review = require("./models/review");
const review = require("./models/review");
const { date } = require("joi");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// const listing = require("./Routes/listings");
// const Review = require("./Routes/review");
const userRouter = require("./Routes/user.js");
const listingRouter = require("./Routes/listings.js");
const reviewRouter = require("./Routes/review.js");


const sessionOption = {
  secret : "mysupersecretcode", 
  resave : false,
  saveUninitialized : true,
cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.render("listings/home", {title : "Home page"});
});

// app.get("/demouser", async (req, res) => {

//   await User.deleteOne({ username: "delta-student" });

//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"
//   });
  
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// }); 

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));
 
async function main() {
  await mongoose.connect(MONGO_URL);
}

// ✅ Register ejs-mate first
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/", listingRouter);
app.use("/", reviewRouter);
app.use("/", userRouter);
// Serve static files (important for your /css/style.css)
app.use(express.static(path.join(__dirname, "public")));

//It will send the custom massage for wrong all routes
app.use((req,res, next)=>{
  // res.render("listings/pagenf", {title:"Show listing" });
  next(new ExpressError(404, "Page Not found on this path"));
 
})

//err-handling middleware 
app.use((err, req, res, next)=>{
  const {statusCode=500, message="Something went wrong"} = err;
  res.status(statusCode).render("listings/error",{err, title : "error page"})

});

app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});