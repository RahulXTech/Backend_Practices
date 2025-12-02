const express = require("express");
const route = express.Router();
const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const { isReviewAuthor, isLoggedIn } = require("../middleWare")
const reviewController = require("../controllers/reviews.js")

// Validate review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// POST Review
route.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE Review.
route.delete(
  "/listing/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);
// EXPORT ROUTER
module.exports = route;