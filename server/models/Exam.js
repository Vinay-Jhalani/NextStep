import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortName: {
      type: String, // e.g., "JEE", "NEET", "CAT"
      required: true,
    },
    conductedBy: {
      type: String, // e.g., "NTA", "CBSE", "State Government"
      required: true,
    },
    examType: {
      type: String,
      enum: ["National", "State", "University", "International"],
      required: true,
    },
    applicableCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    eligibilityCriteria: {
      minPercentage: Number,
      ageLimit: {
        min: Number,
        max: Number,
      },
      requiredStream: [String],
    },
    examPattern: {
      mode: {
        type: String,
        enum: ["Online", "Offline", "Both"],
      },
      duration: Number, // in minutes
      totalMarks: Number,
      sections: [
        {
          name: String,
          questions: Number,
          marks: Number,
        },
      ],
    },
    registrationLink: {
      type: String,
    },
    officialWebsite: {
      type: String,
    },
    typicalCutoff: {
      general: Number,
      obc: Number,
      sc: Number,
      st: Number,
    },
    examDates: [
      {
        session: String, // e.g., "Session 1", "January Attempt"
        registrationStart: Date,
        registrationEnd: Date,
        examDate: Date,
        resultDate: Date,
      },
    ],
    applicationFees: {
      general: Number,
      reserved: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
