const Review = require('../models/Review');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour)
    req.body.tour = req.params.tourId;

  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Get All Reviews
exports.getAllReviews = factory.getAll(Review);

// Get Review
exports.getReview = factory.getOne(Review);

// Create Review
exports.createReview = factory.createOne(Review);

// Update Review
exports.updateReview = factory.updateOne(Review);

// Delete Review
exports.deleteReview = factory.deleteOne(Review);
