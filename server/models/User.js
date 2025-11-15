import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    interests: {
      primary: {
        type: String,
        enum: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional",
        ],
      },
      secondary: {
        type: String,
        enum: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional",
        ],
      },
    },
    quizCompleted: {
      type: Boolean,
      default: false,
    },
    // Education Profile
    education: {
      stream: {
        type: String,
        enum: [
          "Science (PCM)", // Physics, Chemistry, Mathematics
          "Science (PCB)", // Physics, Chemistry, Biology
          "Science (PCMB)", // Physics, Chemistry, Mathematics, Biology
          "Commerce (with Maths)",
          "Commerce (without Maths)",
          "Arts (Humanities)",
          "Vocational",
          "Other",
        ],
        required: false,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      passingYear: Number,
      board: String, // e.g., "CBSE", "ICSE", "State Board"
    },
    // Exam Scores
    examScores: [
      {
        examName: String, // e.g., "JEE Main", "NEET", "SAT"
        score: Number,
        maxScore: Number,
        percentile: Number,
        year: Number,
      },
    ],
    // Preferences
    preferences: {
      preferredStreams: [String], // e.g., ["Engineering", "Medical", "Commerce"]
      budget: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 1000000 },
      },
      location: {
        preferredStates: [String],
        preferredCities: [String],
        maxDistance: Number, // in km
      },
      collegeType: {
        type: [String],
        enum: ["Government", "Private", "Deemed", "Autonomous"],
      },
    },
    savedPrograms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
    savedColleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
