import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Admission",
        "Exam",
        "Scholarship",
        "Deadline",
        "Result",
        "General",
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    applicableStreams: [
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
          "Other",
          "All",
        ],
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    registrationLink: {
      type: String,
    },
    externalUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Index for filtering active alerts
alertSchema.index({ isActive: 1, endDate: 1 });
alertSchema.index({ type: 1, applicableStreams: 1 });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
