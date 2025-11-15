import express from "express";
import Program from "../models/Program.js";
import College from "../models/College.js";

const router = express.Router();

// @route   GET /api/programs
// @desc    Get all programs with filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { interests, degree_type, search } = req.query;
    let query = {};

    // Filter by interests (primary and secondary from user's RIASEC)
    if (interests) {
      const interestArray = interests.split(",");
      query.interest_tags = { $in: interestArray };
    }

    // Filter by degree type
    if (degree_type) {
      query.degree_type = degree_type;
    }

    // Search by name or description
    if (search) {
      query.$text = { $search: search };
    }

    const programs = await Program.find(query)
      .populate("college_ids", "name type location ranking")
      .sort({ program_name: 1 });

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/programs/:id
// @desc    Get single program by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate(
      "college_ids"
    );

    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/programs/recommended/:userId
// @desc    Get recommended programs based on user's RIASEC profile
// @access  Private
router.get("/recommended/:userId", async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.params.userId);

    if (!user || !user.interests.primary) {
      return res
        .status(404)
        .json({
          message: "User interests not found. Please complete the quiz first.",
        });
    }

    // Find programs that match user's primary or secondary interests
    const programs = await Program.find({
      interest_tags: {
        $in: [user.interests.primary, user.interests.secondary],
      },
    })
      .populate("college_ids", "name type location ranking")
      .limit(20);

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
