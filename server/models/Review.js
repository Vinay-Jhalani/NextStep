import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    // Detailed ratings
    ratings: {
      academics: {
        type: Number,
        min: 1,
        max: 5,
      },
      infrastructure: {
        type: Number,
        min: 1,
        max: 5,
      },
      faculty: {
        type: Number,
        min: 1,
        max: 5,
      },
      placements: {
        type: Number,
        min: 1,
        max: 5,
      },
      campusLife: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    review: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    course: {
      type: String, // Course the reviewer studied
    },
    batch: {
      type: String, // e.g., "2020-2024"
    },
    pros: [String],
    cons: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one review per user per college
reviewSchema.index({ user: 1, college: 1 }, { unique: true });
reviewSchema.index({ college: 1, rating: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
