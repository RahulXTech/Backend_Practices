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
const listing = require("./Routes/listings");
const Review = require("./Routes/review");

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
app.use("/", listing);
app.use("/", Review)

// Serve static files (important for your /css/style.css)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.send("Hi, I am root");
  res.render("listings/home", {title : "Home page"})
});

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