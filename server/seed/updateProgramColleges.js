import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "../models/College.js";
import Program from "../models/Program.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
);

const updateProgramColleges = async () => {
  try {
    console.log("🔄 Updating program college_ids...\n");

    // Fetch all colleges and programs
    const colleges = await College.find({});
    const programs = await Program.find({});

    console.log(
      `Found ${colleges.length} colleges and ${programs.length} programs\n`
    );

    // Create a map of program name to program document
    const programMap = {};
    programs.forEach((p) => {
      programMap[p.program_name] = p;
    });

    let updateCount = 0;

    // For each college, update the programs it offers
    for (const college of colleges) {
      console.log(`Processing: ${college.name}...`);

      if (college.programs_offered && college.programs_offered.length > 0) {
        // Get the program IDs this college offers
        const programIds = college.programs_offered;

        // For each program, add this college's ID if not already present
        for (const programId of programIds) {
          const program = programs.find((p) => p._id.equals(programId));

          if (program) {
            // Check if college ID is already in the program's college_ids array
            const collegeIdExists = program.college_ids.some(
              (id) => id.toString() === college._id.toString()
            );

            if (!collegeIdExists) {
              program.college_ids.push(college._id);
              await program.save();
              console.log(
                `  ✓ Added ${college.name} to ${program.program_name}`
              );
              updateCount++;
            } else {
              console.log(
                `  - ${college.name} already in ${program.program_name}`
              );
            }
          }
        }
      } else {
        console.log(`  ⚠ No programs offered by this college`);
      }
    }

    console.log(
      `\n✅ Update complete! Added ${updateCount} college-program links.`
    );

    // Display summary
    console.log("\n📊 Program Summary:");
    for (const program of programs) {
      const updated = await Program.findById(program._id);
      console.log(
        `${updated.program_name}: ${updated.college_ids.length} colleges`
      );
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating programs:", error);
    process.exit(1);
  }
};

updateProgramColleges();
