import express from "express";
import Review from "../models/Review.js";
import College from "../models/College.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/reviews/college/:collegeId
// @desc    Get all reviews for a college
// @access  Public
router.get("/college/:collegeId", async (req, res) => {
  try {
    const { sort = "-createdAt", limit = 20 } = req.query;

    const reviews = await Review.find({ college: req.params.collegeId })
      .populate("user", "name")
      .sort(sort)
      .limit(parseInt(limit));

    // Calculate average ratings
    const stats = await Review.aggregate([
      { $match: { college: req.params.collegeId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          avgAcademics: { $avg: "$ratings.academics" },
          avgInfrastructure: { $avg: "$ratings.infrastructure" },
          avgFaculty: { $avg: "$ratings.faculty" },
          avgPlacements: { $avg: "$ratings.placements" },
          avgCampusLife: { $avg: "$ratings.campusLife" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
      stats: stats[0] || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
});

// @route   GET /api/reviews/:id
// @desc    Get single review by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "name")
      .populate("college", "name location");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const {
      college,
      rating,
      ratings,
      title,
      review,
      course,
      batch,
      pros,
      cons,
    } = req.body;

    // Check if user already reviewed this college
    const existingReview = await Review.findOne({
      user: req.user._id,
      college,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this college",
      });
    }

    // Create review
    const newReview = await Review.create({
      user: req.user._id,
      college,
      rating,
      ratings,
      title,
      review,
      course,
      batch,
      pros,
      cons,
    });

    // Update college's average rating
    const reviewStats = await Review.aggregate([
      { $match: { college } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (reviewStats.length > 0) {
      await College.findByIdAndUpdate(college, {
        avgRating: reviewStats[0].avgRating,
        totalReviews: reviewStats[0].totalReviews,
      });
    }

    const populatedReview = await Review.findById(newReview._id)
      .populate("user", "name")
      .populate("college", "name");

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: populatedReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review (only by the author)
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user is the author
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own reviews",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (only by the author)
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user is the author
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update college's average rating
    const reviewStats = await Review.aggregate([
      { $match: { college: review.college } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (reviewStats.length > 0) {
      await College.findByIdAndUpdate(review.college, {
        avgRating: reviewStats[0].avgRating,
        totalReviews: reviewStats[0].totalReviews,
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
});

// @route   POST /api/reviews/:id/helpful
// @desc    Mark a review as helpful
// @access  Private
router.post("/:id/helpful", protect, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review marked as helpful",
      helpfulCount: review.helpfulCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
});

export default router;
