import express from "express";
import Course from "../models/Course.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with optional filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, level, stream } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (level) {
      query.level = level;
    }
    if (stream) {
      query.eligibleStreams = stream;
    }

    const courses = await Course.find(query)
      .populate("acceptedExams")
      .sort({ name: 1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "acceptedExams"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (Admin only)
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course (Admin only)
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course (Admin only)
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
});

export default router;
