import express from "express";
import { generateRecommendations } from "../utils/recommendationEngine.js";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/recommendations
// @desc    Get personalized recommendations for the logged-in user
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    // Get user profile with all details
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has completed profile
    if (!user.education || !user.education.stream) {
      return res.status(400).json({
        success: false,
        message: "Please complete your education profile first",
      });
    }

    // Get limit from query params (default: 10)
    const limit = parseInt(req.query.limit) || 10;

    // Generate recommendations
    const recommendations = await generateRecommendations(user, limit);

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      profile: {
        stream: user.education.stream,
        subjects: user.education.subjects,
        percentage: user.education.percentage,
        budget: user.preferences?.budget,
        preferredStreams: user.preferences?.preferredStreams,
      },
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recommendations",
      error: error.message,
    });
  }
});

// @route   GET /api/recommendations/interests
// @desc    Get RIASEC-based recommendations (existing system)
// @access  Private
router.get("/interests", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.interests || !user.interests.primary) {
      return res.status(400).json({
        success: false,
        message: "Please complete the RIASEC quiz first",
      });
    }

    // Return colleges matching RIASEC interests
    // This integrates with your existing system
    res.json({
      success: true,
      message: "RIASEC-based recommendations",
      interests: user.interests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
      error: error.message,
    });
  }
});

export default router;
