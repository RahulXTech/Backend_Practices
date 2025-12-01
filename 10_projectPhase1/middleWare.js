const review = require("./models/review");

module.exports.isLoggedIn = (req, res, next)=>{
  console.log(req.path, "..", req.originalUrl)
    if(!req.isAuthenticated()){
      //redirectUrl 
      req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be login.")
    return res.redirect("/login")
  }
  next();
}

module.exports.isReviewAuthor = async(req, res, next)=>{
  let {reviewId} = req.params;
  let review = await review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}