const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const review = require("../models/review");



const validateReview = (req, res, next)=>{
    let {error} =  reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};


// Reviews - Post route
route.post("/listings/:id/reviews",validateReview, wrapAsync(async(req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review saved");

  return res.redirect(`/listing/${listing._id}`);  // FIXED
}));

// Delete Review Route
route.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete review document
  await Review.findByIdAndDelete(reviewId);

  // Redirect or send response
  res.redirect(`/listing/${id}`);
}));