import express from "express";
import Alert from "../models/Alert.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/alerts
// @desc    Get all active alerts with optional filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { type, stream } = req.query;
    let query = { isActive: true };

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by applicable stream
    if (stream) {
      query.applicableStreams = { $in: [stream, "All"] };
    }

    // Only show alerts that haven't expired
    query.endDate = { $gte: new Date() };

    const alerts = await Alert.find(query)
      .populate("college", "name location")
      .populate("courses", "name shortName")
      .populate("exam", "name shortName")
      .sort({ priority: -1, createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching alerts",
      error: error.message,
    });
  }
});

// @route   GET /api/alerts/:id
// @desc    Get single alert by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)
      .populate("college")
      .populate("courses")
      .populate("exam");

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    res.json({
      success: true,
      data: alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching alert",
      error: error.message,
    });
  }
});

// @route   POST /api/alerts
// @desc    Create a new alert (Admin only)
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const alertData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const alert = await Alert.create(alertData);

    res.status(201).json({
      success: true,
      message: "Alert created successfully",
      data: alert,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating alert",
      error: error.message,
    });
  }
});

// @route   PUT /api/alerts/:id
// @desc    Update an alert (Admin only)
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    res.json({
      success: true,
      message: "Alert updated successfully",
      data: alert,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating alert",
      error: error.message,
    });
  }
});

// @route   DELETE /api/alerts/:id
// @desc    Delete an alert (Admin only)
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    res.json({
      success: true,
      message: "Alert deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting alert",
      error: error.message,
    });
  }
});

export default router;
