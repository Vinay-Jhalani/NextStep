import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortName: {
      type: String, // e.g., "B.Tech", "MBBS", "BCA"
      required: true,
    },
    duration: {
      years: Number,
      months: Number,
    },
    level: {
      type: String,
      enum: ["UG", "PG", "Diploma", "Certificate", "Doctorate"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Engineering",
        "Medical",
        "Commerce",
        "Arts",
        "Science",
        "Management",
        "Law",
        "Design",
        "Agriculture",
        "Other",
      ],
      required: true,
    },
    requiredSubjects: [
      {
        type: String, // e.g., "Physics", "Chemistry", "Mathematics"
      },
    ],
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
    minEligibilityPercent: {
      type: Number,
      default: 50,
    },
    acceptedExams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    typicalFeesRange: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
    description: {
      type: String,
    },
    careerProspects: [String],
    topRecruiters: [String],
    averageSalary: {
      amount: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
