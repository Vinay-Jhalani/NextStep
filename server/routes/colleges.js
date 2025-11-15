import express from "express";
import College from "../models/College.js";
import Program from "../models/Program.js";

const router = express.Router();

// @route   GET /api/colleges
// @desc    Get all colleges with filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { type, state, city, search, sort } = req.query;
    let query = {};

    // Filter by type (Public/Private)
    if (type) {
      query.type = type;
    }

    // Filter by location
    if (state) {
      query["location.state"] = state;
    }
    if (city) {
      query["location.city"] = city;
    }

    // Search by name or location
    if (search) {
      query.$text = { $search: search };
    }

    let sortOption = { name: 1 };
    if (sort === "ranking") {
      sortOption = { "ranking.nirf": 1 };
    } else if (sort === "name") {
      sortOption = { name: 1 };
    }

    const colleges = await College.find(query)
      .populate("programs_offered", "program_name degree_type interest_tags")
      .sort(sortOption);

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/colleges/:id
// @desc    Get single college by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate(
      "programs_offered"
    );

    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ message: "College not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/colleges/state/list
// @desc    Get list of all states
// @access  Public
router.get("/state/list", async (req, res) => {
  try {
    const states = await College.distinct("location.state");
    res.json(states.filter((state) => state)); // Filter out null/undefined
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
