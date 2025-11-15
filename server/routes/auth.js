import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        quizCompleted: user.quizCompleted,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedPrograms")
      .populate("savedColleges");

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        quizCompleted: user.quizCompleted,
        savedPrograms: user.savedPrograms,
        savedColleges: user.savedColleges,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.education = req.body.education || user.education;
    user.examScores = req.body.examScores || user.examScores;
    user.preferences = req.body.preferences || user.preferences;

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        education: updatedUser.education,
        examScores: updatedUser.examScores,
        preferences: updatedUser.preferences,
        interests: updatedUser.interests,
        quizCompleted: updatedUser.quizCompleted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/saved-colleges/:collegeId
// @desc    Toggle save/unsave college
// @access  Private
router.post("/saved-colleges/:collegeId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const collegeId = req.params.collegeId;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if college is already saved
    const isSaved = user.savedColleges.some(
      (id) => id.toString() === collegeId
    );

    if (isSaved) {
      // Remove from saved colleges
      user.savedColleges = user.savedColleges.filter(
        (id) => id.toString() !== collegeId
      );
    } else {
      // Add to saved colleges
      user.savedColleges.push(collegeId);
    }

    await user.save();

    // Populate saved colleges before sending response
    const updatedUser = await User.findById(req.user._id).populate(
      "savedColleges"
    );

    res.json({
      success: true,
      message: isSaved
        ? "College removed from saved"
        : "College saved successfully",
      savedColleges: updatedUser.savedColleges,
      isSaved: !isSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
