import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      profile: {
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
  ],
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "RIASEC Career Interest Quiz",
    },
    description: {
      type: String,
      default: "Discover your top career interests based on the RIASEC model",
    },
    questions: [questionSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
