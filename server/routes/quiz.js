import express from "express";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

const router = express.Router();

// @route   GET /api/quiz
// @desc    Get active quiz
// @access  Public
router.get("/", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ active: true });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers and calculate RIASEC profile
// @access  Private
router.post("/submit", async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // Count each profile occurrence
    const profileCounts = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    // Calculate scores
    answers.forEach((answer) => {
      if (answer.profile && profileCounts.hasOwnProperty(answer.profile)) {
        profileCounts[answer.profile]++;
      }
    });

    // Sort profiles by count and get top 2
    const sortedProfiles = Object.entries(profileCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    const primary = sortedProfiles[0][0];
    const secondary = sortedProfiles[1][0];

    // Update user's interests
    const user = await User.findByIdAndUpdate(
      userId,
      {
        interests: { primary, secondary },
        quizCompleted: true,
      },
      { new: true }
    );

    res.json({
      interests: { primary, secondary },
      scores: profileCounts,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        quizCompleted: user.quizCompleted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
