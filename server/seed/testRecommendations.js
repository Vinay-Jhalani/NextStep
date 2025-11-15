import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateRecommendations } from "../utils/recommendationEngine.js";
import User from "../models/User.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
);

const testRecommendationEngine = async () => {
  try {
    console.log("🧪 Testing Recommendation Engine...\n");

    // Create a test student profile
    const testStudent = {
      education: {
        stream: "Science (PCM)",
        percentage: 92,
        passingYear: 2024,
        board: "CBSE",
      },
      examScores: [
        {
          examName: "JEE Main",
          score: 250,
          percentile: 95.5,
          year: 2024,
        },
      ],
      preferences: {
        preferredStreams: ["Engineering", "Technology"],
        budget: { min: 50000, max: 300000 },
        location: ["Delhi", "Maharashtra"],
        collegeType: "Any",
      },
    };

    console.log("📋 Test Student Profile:");
    console.log(`  Stream: ${testStudent.education.stream}`);
    console.log(`  Percentage: ${testStudent.education.percentage}%`);
    console.log(
      `  JEE Main Percentile: ${testStudent.examScores[0].percentile}`
    );
    console.log(
      `  Budget: ₹${testStudent.preferences.budget.min} - ₹${testStudent.preferences.budget.max}`
    );
    console.log(
      `  Preferred Locations: ${testStudent.preferences.location.join(", ")}`
    );
    console.log("\n" + "=".repeat(60) + "\n");

    // Generate recommendations
    const recommendations = await generateRecommendations(testStudent, 5);

    console.log(`✅ Generated ${recommendations.length} recommendations:\n`);

    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.collegeName} - ${rec.courseName}`);
      console.log(
        `   Score: ${rec.score}/100 | Eligible: ${rec.eligible ? "✓" : "✗"}`
      );
      console.log(`   Fees: ₹${rec.fees.toLocaleString("en-IN")}`);
      console.log(`   Reasons:`);
      rec.reasons.forEach((reason) => {
        console.log(`   • ${reason}`);
      });
      console.log("");
    });

    console.log("\n✅ Recommendation engine test completed!\n");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error testing recommendation engine:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

testRecommendationEngine();
