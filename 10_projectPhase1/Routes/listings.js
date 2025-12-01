const express = require("express");
const route = express.Router();
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const {listingSchema, reviewSchema} = require("../schema");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleWare.js");

const validateListing = (req, res, next)=>{
    let {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

route.get("/listing", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index", {title: "All All Listings", allListing });
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});

// New route
route.get("/listing/new", isLoggedIn,(req, res) => {
  res.render("listings/new" , {title: "All All Listings"});
});

// Show route
route.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate:{
      path : "author",
    }
  })
    .populate("owner");

  if(!listing){
    req.flash("error", "listing you requested for does not exist!");
    return res.redirect("/listing");
  }
  console.log(listing);
  res.render("listings/show", { listing, title:"Show listing" });
});

// Create route
route.post("/listings",validateListing, wrapAsync( async(req, res) => {
    const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id; 
    await newListing.save();
    req.flash("success", "New listing created!")
    res.redirect("/listing");  
}));

// Edit route
route.get("/listings/:id/edit",isLoggedIn, wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "listing you requested for does not exist!");
    return res.redirect("/listing");
  }
  res.render("listings/edit", { listing, title : "All listing" });
}));

// Update route
route.put("/listings/:id",isLoggedIn, wrapAsync( async (req, res) => {
  let { id } = req.params;

   // find the listing
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listing");
  }

  // Ensure req.user exists (isLoggedIn should provide it) and check ownership
  const userId = req.user && req.user._id;
  if (!userId) {
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "listing updated!!")
  res.redirect(`/listing/${id}`);
}));

// Delete route
route.delete("/listings/:id",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing deleted!!!!!!");
  res.redirect("/listing");
}));
module.exports = route;