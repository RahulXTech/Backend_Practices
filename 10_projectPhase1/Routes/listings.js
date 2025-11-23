const express = require("express");
const route = express.Router();

const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const {listingSchema, reviewSchema} = require("../schema");
const Listing = require("../models/listing");



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
route.get("/listing/new", (req, res) => {
  res.render("listings/new" , {title: "All All Listings"});
});

// Show route
route.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show", { listing, title:"Show listing" });
});
// Create route
route.post("/listings",validateListing, wrapAsync( async(req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");  
}));

// Edit route
route.get("/listings/:id/edit", wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing, title : "All listing" });
}));

// Update route
route.put("/listings/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
}));

// Delete route
route.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listing");
}));

module.exports = route;