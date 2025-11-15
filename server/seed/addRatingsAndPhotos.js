import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "../models/College.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
);

const addRatingsAndPhotos = async () => {
  try {
    console.log("🔄 Adding ratings and photos to all colleges...\n");

    // Fetch all colleges
    const colleges = await College.find({});
    console.log(`Found ${colleges.length} colleges\n`);

    const photoUrl =
      "https://static.boostmytalent.com/img/univ/lpu-online-mba-admission.webp";

    let updateCount = 0;

    for (const college of colleges) {
      // Generate a realistic rating between 3.5 and 5.0
      // Top ranked colleges get higher ratings
      let avgRating;
      if (college.ranking?.nirf <= 5) {
        avgRating = (4.5 + Math.random() * 0.5).toFixed(2); // 4.5 - 5.0
      } else if (college.ranking?.nirf <= 20) {
        avgRating = (4.0 + Math.random() * 0.5).toFixed(2); // 4.0 - 4.5
      } else if (college.ranking?.nirf <= 50) {
        avgRating = (3.7 + Math.random() * 0.5).toFixed(2); // 3.7 - 4.2
      } else {
        avgRating = (3.5 + Math.random() * 0.5).toFixed(2); // 3.5 - 4.0
      }

      // Generate random but realistic total reviews
      let totalReviews;
      if (college.ranking?.nirf <= 5) {
        totalReviews = Math.floor(80 + Math.random() * 50); // 80-130
      } else if (college.ranking?.nirf <= 20) {
        totalReviews = Math.floor(50 + Math.random() * 40); // 50-90
      } else if (college.ranking?.nirf <= 50) {
        totalReviews = Math.floor(30 + Math.random() * 30); // 30-60
      } else {
        totalReviews = Math.floor(15 + Math.random() * 25); // 15-40
      }

      // Update college with rating and photo
      college.avgRating = parseFloat(avgRating);
      college.totalReviews = totalReviews;
      college.photos = [
        {
          url: photoUrl,
          publicId: "college-default-image",
          caption: `${college.name} Campus`,
        },
      ];

      await college.save();

      console.log(`✓ ${college.name}`);
      console.log(`  Rating: ${avgRating}/5.0 (${totalReviews} reviews)`);
      console.log(`  Photo: Added\n`);

      updateCount++;
    }

    console.log(`\n✅ Successfully updated ${updateCount} colleges!`);
    console.log("\n📊 Summary:");
    console.log(`- All colleges now have ratings`);
    console.log(`- All colleges now have photos`);
    console.log(`- Average ratings range from 3.5 to 5.0`);
    console.log(`- Total reviews range from 15 to 130 based on ranking`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating colleges:", error);
    process.exit(1);
  }
};

addRatingsAndPhotos();
