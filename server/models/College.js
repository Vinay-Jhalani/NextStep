import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },
    location: {
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
    },
    established: {
      type: Number,
    },
    accreditation: [
      {
        type: String,
      },
    ],
    ranking: {
      nirf: Number,
      overall: Number,
    },
    programs_offered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
    // Photo Gallery (Cloudinary)
    photos: [
      {
        url: String,
        publicId: String,
        caption: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Offered Courses with Details
    offeredCourses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        availableSeats: Number,
        acceptedExams: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
          },
        ],
        minEligibilityPercent: {
          type: Number,
          default: 50,
        },
        requiredSubjects: [String],
        eligibleStreams: [
          {
            type: String,
            enum: [
              "Science (PCM)",
              "Science (PCB)",
              "Science (PCMB)",
              "Commerce (with Maths)",
              "Commerce (without Maths)",
              "Arts (Humanities)",
              "Vocational",
              "Any",
            ],
          },
        ],
        feesRange: {
          min: Number,
          max: Number,
          currency: {
            type: String,
            default: "INR",
          },
        },
        cutoffs: {
          general: Number,
          obc: Number,
          sc: Number,
          st: Number,
        },
      },
    ],
    admission_info: {
      application_deadline: String,
      entrance_exams: [String],
      cutoff_details: String,
      applicationLink: String,
      admissionProcess: String,
    },
    fees: {
      annual_tuition: String,
      hostel_fees: String,
    },
    facilities: [
      {
        type: String,
      },
    ],
    placement_stats: {
      average_package: String,
      highest_package: String,
      placement_percentage: String,
      top_recruiters: [String],
    },
    // Ratings & Reviews
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    website: {
      type: String,
    },
    contact: {
      email: String,
      phone: String,
      address: String,
    },
    image_url: {
      type: String,
    },
    // Geolocation for distance calculation
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search and filtering
collegeSchema.index({
  name: "text",
  "location.city": "text",
  "location.state": "text",
});
collegeSchema.index({ type: 1 });
collegeSchema.index({ "ranking.nirf": 1 });

const College = mongoose.model("College", collegeSchema);

export default College;
