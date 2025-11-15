import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import Exam from "../models/Exam.js";
import Alert from "../models/Alert.js";
import College from "../models/College.js";
import Program from "../models/Program.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
);

const seedEnhancedData = async () => {
  try {
    console.log("🌱 Starting enhanced data seeding...\n");

    // Clear existing data
    await Course.deleteMany({});
    await Exam.deleteMany({});
    await Alert.deleteMany({});
    console.log("✓ Cleared existing enhanced data\n");

    // ==================== COURSES ====================
    console.log("📚 Seeding courses...");
    const courses = await Course.insertMany([
      {
        name: "Bachelor of Technology",
        shortName: "B.Tech",
        duration: { years: 4, months: 0 },
        level: "UG",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        eligibleStreams: ["Science (PCM)", "Science (PCMB)"],
        minEligibilityPercent: 75,
        typicalFeesRange: { min: 100000, max: 500000 },
        description:
          "Undergraduate engineering degree covering various specializations like Computer Science, Mechanical, Electrical, Civil, and more.",
        careerProspects: [
          "Software Engineer",
          "Data Scientist",
          "Mechanical Engineer",
          "Civil Engineer",
        ],
        topRecruiters: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft"],
        averageSalary: { amount: 600000 },
      },
      {
        name: "Bachelor of Medicine, Bachelor of Surgery",
        shortName: "MBBS",
        duration: { years: 5, months: 6 },
        level: "UG",
        category: "Medical",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        eligibleStreams: ["Science (PCB)", "Science (PCMB)"],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 500000, max: 8000000 },
        description:
          "Professional medical degree to become a licensed medical practitioner.",
        careerProspects: ["Doctor", "Surgeon", "Medical Officer", "Researcher"],
        topRecruiters: ["AIIMS", "Apollo", "Fortis", "Max Healthcare"],
        averageSalary: { amount: 800000 },
      },
      {
        name: "Bachelor of Computer Applications",
        shortName: "BCA",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Science",
        requiredSubjects: ["Mathematics"],
        eligibleStreams: [
          "Science (PCM)",
          "Science (PCMB)",
          "Commerce (with Maths)",
        ],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 50000, max: 200000 },
        description:
          "Undergraduate degree focused on computer applications and programming.",
        careerProspects: [
          "Software Developer",
          "Web Developer",
          "Database Administrator",
        ],
        topRecruiters: ["Cognizant", "Capgemini", "Tech Mahindra"],
        averageSalary: { amount: 400000 },
      },
      {
        name: "Bachelor of Commerce",
        shortName: "B.Com",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Commerce",
        requiredSubjects: [],
        eligibleStreams: [
          "Commerce (with Maths)",
          "Commerce (without Maths)",
          "Any",
        ],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 30000, max: 150000 },
        description:
          "Undergraduate commerce degree covering accounting, finance, and business studies.",
        careerProspects: [
          "Accountant",
          "Financial Analyst",
          "Tax Consultant",
          "Auditor",
        ],
        topRecruiters: ["Deloitte", "EY", "KPMG", "PwC"],
        averageSalary: { amount: 350000 },
      },
      {
        name: "Bachelor of Business Administration",
        shortName: "BBA",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Management",
        requiredSubjects: [],
        eligibleStreams: ["Any"],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 80000, max: 300000 },
        description:
          "Undergraduate management degree focusing on business administration and leadership.",
        careerProspects: [
          "Business Manager",
          "Marketing Manager",
          "HR Manager",
          "Entrepreneur",
        ],
        topRecruiters: ["Reliance", "Tata", "Aditya Birla", "ITC"],
        averageSalary: { amount: 400000 },
      },
      {
        name: "Bachelor of Arts",
        shortName: "BA",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Arts",
        requiredSubjects: [],
        eligibleStreams: ["Arts (Humanities)", "Any"],
        minEligibilityPercent: 45,
        typicalFeesRange: { min: 20000, max: 100000 },
        description:
          "Undergraduate liberal arts degree covering humanities and social sciences.",
        careerProspects: [
          "Teacher",
          "Journalist",
          "Content Writer",
          "Civil Services",
        ],
        topRecruiters: ["Media Houses", "NGOs", "Government", "Publishing"],
        averageSalary: { amount: 300000 },
      },
      {
        name: "Bachelor of Science",
        shortName: "B.Sc",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Science",
        requiredSubjects: [],
        eligibleStreams: ["Science (PCM)", "Science (PCB)", "Science (PCMB)"],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 30000, max: 150000 },
        description:
          "Undergraduate science degree with specializations in various scientific fields.",
        careerProspects: [
          "Research Scientist",
          "Lab Technician",
          "Teacher",
          "Analyst",
        ],
        topRecruiters: ["ISRO", "DRDO", "Research Labs", "Universities"],
        averageSalary: { amount: 350000 },
      },
      {
        name: "Bachelor of Architecture",
        shortName: "B.Arch",
        duration: { years: 5, months: 0 },
        level: "UG",
        category: "Design",
        requiredSubjects: ["Mathematics"],
        eligibleStreams: ["Science (PCM)", "Science (PCMB)"],
        minEligibilityPercent: 50,
        typicalFeesRange: { min: 150000, max: 500000 },
        description:
          "Professional degree in architectural design and construction.",
        careerProspects: [
          "Architect",
          "Urban Planner",
          "Interior Designer",
          "Project Manager",
        ],
        topRecruiters: ["DLF", "Sobha", "Godrej Properties", "L&T"],
        averageSalary: { amount: 450000 },
      },
      {
        name: "Bachelor of Laws",
        shortName: "LLB",
        duration: { years: 3, months: 0 },
        level: "UG",
        category: "Law",
        requiredSubjects: [],
        eligibleStreams: ["Any"],
        minEligibilityPercent: 45,
        typicalFeesRange: { min: 50000, max: 300000 },
        description: "Professional law degree for legal practice and advocacy.",
        careerProspects: [
          "Lawyer",
          "Legal Advisor",
          "Judge",
          "Corporate Counsel",
        ],
        topRecruiters: [
          "Law Firms",
          "Corporate Legal Depts",
          "Judiciary",
          "Government",
        ],
        averageSalary: { amount: 500000 },
      },
    ]);
    console.log(`✓ Seeded ${courses.length} courses\n`);

    // ==================== EXAMS ====================
    console.log("📝 Seeding exams...");
    const exams = await Exam.insertMany([
      {
        name: "Joint Entrance Examination Main",
        shortName: "JEE Main",
        conductedBy: "NTA",
        examType: "National",
        applicableCourses: [courses[0]._id], // B.Tech
        eligibilityCriteria: {
          minPercentage: 75,
          ageLimit: { min: 17, max: 25 },
          requiredStream: ["Science (PCM)", "Science (PCMB)"],
        },
        examPattern: {
          mode: "Online",
          duration: 180,
          totalMarks: 300,
          sections: [
            { name: "Physics", questions: 30, marks: 100 },
            { name: "Chemistry", questions: 30, marks: 100 },
            { name: "Mathematics", questions: 30, marks: 100 },
          ],
        },
        registrationLink: "https://jeemain.nta.nic.in",
        officialWebsite: "https://jeemain.nta.nic.in",
        typicalCutoff: { general: 90, obc: 75, sc: 55, st: 45 },
        applicationFees: { general: 1000, reserved: 500 },
        description:
          "National level engineering entrance exam for admission to NITs, IIITs, and other engineering colleges.",
      },
      {
        name: "National Eligibility cum Entrance Test",
        shortName: "NEET",
        conductedBy: "NTA",
        examType: "National",
        applicableCourses: [courses[1]._id], // MBBS
        eligibilityCriteria: {
          minPercentage: 50,
          ageLimit: { min: 17, max: 25 },
          requiredStream: ["Science (PCB)", "Science (PCMB)"],
        },
        examPattern: {
          mode: "Offline",
          duration: 180,
          totalMarks: 720,
          sections: [
            { name: "Physics", questions: 50, marks: 180 },
            { name: "Chemistry", questions: 50, marks: 180 },
            { name: "Biology", questions: 100, marks: 360 },
          ],
        },
        registrationLink: "https://neet.nta.nic.in",
        officialWebsite: "https://neet.nta.nic.in",
        typicalCutoff: { general: 600, obc: 550, sc: 500, st: 450 },
        applicationFees: { general: 1600, reserved: 900 },
        description:
          "National level medical entrance exam for MBBS and BDS admissions.",
      },
      {
        name: "Common Admission Test",
        shortName: "CAT",
        conductedBy: "IIMs",
        examType: "National",
        applicableCourses: [],
        eligibilityCriteria: {
          minPercentage: 50,
          requiredStream: ["Any"],
        },
        examPattern: {
          mode: "Online",
          duration: 120,
          totalMarks: 198,
          sections: [
            {
              name: "Verbal Ability & Reading Comprehension",
              questions: 24,
              marks: 72,
            },
            {
              name: "Data Interpretation & Logical Reasoning",
              questions: 20,
              marks: 60,
            },
            { name: "Quantitative Ability", questions: 22, marks: 66 },
          ],
        },
        registrationLink: "https://iimcat.ac.in",
        officialWebsite: "https://iimcat.ac.in",
        typicalCutoff: { general: 90, obc: 75, sc: 65, st: 55 },
        applicationFees: { general: 2300, reserved: 1150 },
        description:
          "National level MBA entrance exam for IIMs and top B-schools.",
      },
      {
        name: "National Aptitude Test in Architecture",
        shortName: "NATA",
        conductedBy: "COA",
        examType: "National",
        applicableCourses: [courses[7]._id], // B.Arch
        eligibilityCriteria: {
          minPercentage: 50,
          requiredStream: ["Science (PCM)", "Science (PCMB)"],
        },
        examPattern: {
          mode: "Both",
          duration: 180,
          totalMarks: 200,
          sections: [
            { name: "Mathematics", questions: 40, marks: 80 },
            { name: "Drawing", questions: 0, marks: 120 },
          ],
        },
        registrationLink: "https://nata.in",
        officialWebsite: "https://nata.in",
        typicalCutoff: { general: 100, obc: 90, sc: 80, st: 70 },
        applicationFees: { general: 1800, reserved: 900 },
        description: "National level entrance exam for B.Arch admissions.",
      },
      {
        name: "Common Law Admission Test",
        shortName: "CLAT",
        conductedBy: "NLUs",
        examType: "National",
        applicableCourses: [courses[8]._id], // LLB
        eligibilityCriteria: {
          minPercentage: 45,
          requiredStream: ["Any"],
        },
        examPattern: {
          mode: "Online",
          duration: 120,
          totalMarks: 150,
          sections: [
            { name: "English Language", questions: 28, marks: 28 },
            { name: "Current Affairs", questions: 35, marks: 35 },
            { name: "Legal Reasoning", questions: 35, marks: 35 },
            { name: "Logical Reasoning", questions: 28, marks: 28 },
            { name: "Quantitative Techniques", questions: 14, marks: 14 },
          ],
        },
        registrationLink: "https://consortiumofnlus.ac.in",
        officialWebsite: "https://consortiumofnlus.ac.in",
        typicalCutoff: { general: 100, obc: 90, sc: 75, st: 65 },
        applicationFees: { general: 4000, reserved: 3500 },
        description: "National level law entrance exam for NLUs.",
      },
    ]);
    console.log(`✓ Seeded ${exams.length} exams\n`);

    // ==================== ALERTS ====================
    console.log("🔔 Seeding alerts...");
    const alerts = await Alert.insertMany([
      {
        title: "JEE Main 2026 Session 1 Registration Open",
        description:
          "Registration for JEE Main 2026 Session 1 has started. Apply before the deadline to secure your seat for the national level engineering entrance exam.",
        type: "Exam",
        priority: "High",
        exam: exams[0]._id, // JEE Main
        applicableStreams: ["Science (PCM)", "Science (PCMB)"],
        startDate: new Date("2025-11-01"),
        endDate: new Date("2026-01-15"),
        registrationLink: "https://jeemain.nta.nic.in",
        isActive: true,
      },
      {
        title: "NEET 2026 Application Form Released",
        description:
          "NEET 2026 application form is now available. Medical aspirants can apply online through the official website.",
        type: "Exam",
        priority: "High",
        exam: exams[1]._id, // NEET
        applicableStreams: ["Science (PCB)", "Science (PCMB)"],
        startDate: new Date("2025-11-10"),
        endDate: new Date("2026-02-28"),
        registrationLink: "https://neet.nta.nic.in",
        isActive: true,
      },
      {
        title: "CAT 2026 Registration Now Open",
        description:
          "CAT 2026 registration is now open. MBA aspirants should apply before the deadline for India's premier management entrance exam.",
        type: "Exam",
        priority: "Medium",
        exam: exams[2]._id, // CAT
        applicableStreams: ["All"],
        startDate: new Date("2025-11-15"),
        endDate: new Date("2026-09-20"),
        registrationLink: "https://iimcat.ac.in",
        isActive: true,
      },
      {
        title: "NATA 2026 Registration Announcement",
        description:
          "Council of Architecture has announced NATA 2026 exam dates. Architecture students can start preparing.",
        type: "Exam",
        priority: "Medium",
        exam: exams[3]._id, // NATA
        applicableStreams: ["Science (PCM)", "Science (PCMB)"],
        startDate: new Date("2025-12-01"),
        endDate: new Date("2026-04-30"),
        registrationLink: "https://nata.in",
        isActive: true,
      },
      {
        title: "CLAT 2026 Early Bird Registration",
        description:
          "Early bird registration for CLAT 2026 is now open with discounted fees. Law aspirants should register early.",
        type: "Admission",
        priority: "Low",
        exam: exams[4]._id, // CLAT
        applicableStreams: ["All"],
        startDate: new Date("2025-11-20"),
        endDate: new Date("2026-05-31"),
        registrationLink: "https://consortiumofnlus.ac.in",
        isActive: true,
      },
      {
        title: "National Scholarship Portal 2025-26 Open",
        description:
          "Students can apply for various government scholarships through the National Scholarship Portal for the academic year 2025-26.",
        type: "Scholarship",
        priority: "High",
        applicableStreams: ["All"],
        startDate: new Date("2025-11-01"),
        endDate: new Date("2026-03-31"),
        externalUrl: "https://scholarships.gov.in",
        isActive: true,
      },
    ]);
    console.log(`✓ Seeded ${alerts.length} alerts\n`);

    // ==================== UPDATE PROGRAMS ====================
    console.log("🔄 Updating programs with eligible streams...");
    await Program.updateMany(
      { degree_type: "B.Tech" },
      {
        $set: {
          eligible_streams: ["Science (PCM)", "Science (PCMB)"],
          min_percentage: 75,
        },
      }
    );
    await Program.updateMany(
      { degree_type: { $in: ["B.Com", "BBA"] } },
      {
        $set: {
          eligible_streams: [
            "Commerce (with Maths)",
            "Commerce (without Maths)",
            "Any",
          ],
          min_percentage: 50,
        },
      }
    );
    await Program.updateMany(
      { degree_type: "BA" },
      {
        $set: {
          eligible_streams: ["Arts (Humanities)", "Any"],
          min_percentage: 45,
        },
      }
    );
    console.log("✓ Updated programs with stream eligibility\n");

    // ==================== UPDATE COLLEGES ====================
    console.log("🔄 Updating colleges with enhanced fields...");
    const sampleColleges = await College.find().limit(5);

    for (const college of sampleColleges) {
      // Add sample offered courses
      const offeredCourses = [];

      if (college.type === "Public") {
        offeredCourses.push({
          course: courses[0]._id, // B.Tech
          availableSeats: 240,
          acceptedExams: [exams[0]._id], // JEE Main
          minEligibilityPercent: 75,
          eligibleStreams: ["Science (PCM)", "Science (PCMB)"],
          feesRange: { min: 100000, max: 200000 },
          cutoffs: { general: 90, obc: 80, sc: 65, st: 55 },
        });
      }

      offeredCourses.push({
        course: courses[2]._id, // BCA
        availableSeats: 120,
        acceptedExams: [],
        minEligibilityPercent: 50,
        eligibleStreams: [
          "Science (PCM)",
          "Science (PCMB)",
          "Commerce (with Maths)",
        ],
        feesRange: { min: 50000, max: 120000 },
        cutoffs: { general: 70, obc: 65, sc: 55, st: 50 },
      });

      offeredCourses.push({
        course: courses[3]._id, // B.Com
        availableSeats: 180,
        acceptedExams: [],
        minEligibilityPercent: 50,
        eligibleStreams: [
          "Commerce (with Maths)",
          "Commerce (without Maths)",
          "Any",
        ],
        feesRange: { min: 30000, max: 80000 },
        cutoffs: { general: 65, obc: 60, sc: 50, st: 45 },
      });

      college.offeredCourses = offeredCourses;
      college.avgRating = Math.random() * 1.5 + 3.5; // 3.5-5.0
      college.totalReviews = Math.floor(Math.random() * 100) + 10;
      college.admission_info.applicationLink = college.website;

      await college.save();
    }
    console.log(
      `✓ Updated ${sampleColleges.length} colleges with course offerings\n`
    );

    console.log("✅ Enhanced data seeding completed successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding enhanced data:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedEnhancedData();
