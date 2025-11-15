import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    program_name: {
      type: String,
      required: true,
      trim: true,
    },
    degree_type: {
      type: String,
      enum: ["B.Tech", "B.Sc", "B.Com", "BBA", "BA", "B.Arch", "BCA", "Other"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "4 years",
    },
    interest_tags: [
      {
        type: String,
        enum: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional",
        ],
        required: true,
      },
    ],
    college_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
      },
    ],
    career_paths: [
      {
        type: String,
      },
    ],
    average_salary: {
      type: String,
    },
    skills_required: [
      {
        type: String,
      },
    ],
    eligibility: {
      type: String,
    },
    eligible_streams: [
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
    min_percentage: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
programSchema.index({ program_name: "text", description: "text" });
programSchema.index({ interest_tags: 1 });

const Program = mongoose.model("Program", programSchema);

export default Program;
