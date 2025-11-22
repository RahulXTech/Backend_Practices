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
const {listigSchema} = require("./schema");
const {listingSchema, reviewSchema} = require("./schema");
const Review = require("./models/review");
const review = require("./models/review");


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


// Serve static files (important for your /css/style.css)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.send("Hi, I am root");
  res.render("listings/home", {title : "Home page"})
});
const validateListing = (req, res, next)=>{
    let {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

const validateReview = (req, res, next)=>{
    let {error} =  reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

app.get("/listing", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index", {title: "All All Listings", allListing });
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});

// New route
app.get("/listing/new", (req, res) => {
  res.render("listings/new" , {title: "All All Listings"});
});

// Show route
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show", { listing, title:"Show listing" });
});
// Create route
app.post("/listings",validateListing, wrapAsync( async(req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");  
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing, title : "All listing" });
}));

// Update route
app.put("/listings/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listing");
}));

// Reviews - Post route
app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review saved");

  return res.redirect(`/listing/${listing._id}`);  // FIXED
}));

// Delete Review Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  // Redirect or send response
  res.redirect(`/listing/${id}`);
}));


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