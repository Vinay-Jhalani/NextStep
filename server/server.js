import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import programRoutes from "./routes/programs.js";
import collegeRoutes from "./routes/colleges.js";
import coursesRoutes from "./routes/courses.js";
import examsRoutes from "./routes/exams.js";
import recommendationsRoutes from "./routes/recommendations.js";
import alertsRoutes from "./routes/alerts.js";
import reviewsRoutes from "./routes/reviews.js";
import { protect } from "./middleware/auth.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NextStep API - Your Career & Education Advisor",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/exams", examsRoutes);
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/reviews", reviewsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 NextStep Server is running!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || "development"}
💾 Database: ${process.env.MONGODB_URI ? "Connected" : "Local"}
  `);
});
