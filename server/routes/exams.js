import express from "express";
import Exam from "../models/Exam.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/exams
// @desc    Get all exams with optional filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { examType, courseCategory } = req.query;
    let query = {};

    if (examType) {
      query.examType = examType;
    }

    const exams = await Exam.find(query)
      .populate("applicableCourses")
      .sort({ name: 1 });

    res.json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching exams",
      error: error.message,
    });
  }
});

// @route   GET /api/exams/:id
// @desc    Get single exam by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate(
      "applicableCourses"
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.json({
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching exam",
      error: error.message,
    });
  }
});

// @route   POST /api/exams
// @desc    Create a new exam (Admin only)
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating exam",
      error: error.message,
    });
  }
});

// @route   PUT /api/exams/:id
// @desc    Update an exam (Admin only)
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.json({
      success: true,
      message: "Exam updated successfully",
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating exam",
      error: error.message,
    });
  }
});

// @route   DELETE /api/exams/:id
// @desc    Delete an exam (Admin only)
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting exam",
      error: error.message,
    });
  }
});

export default router;
