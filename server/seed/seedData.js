import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "../models/Quiz.js";
import Program from "../models/Program.js";
import College from "../models/College.js";

dotenv.config();

const quizData = {
  title: "RIASEC Career Interest Quiz",
  description:
    "Discover your top career interests based on the RIASEC model. This quiz will help you understand which careers and educational programs align with your natural preferences.",
  questions: [
    {
      question: "I enjoy working with my hands and building things.",
      options: [
        { text: "Strongly Agree", profile: "Realistic" },
        { text: "Agree", profile: "Realistic" },
        { text: "Neutral", profile: "Realistic" },
        { text: "Disagree", profile: "Investigative" },
        { text: "Strongly Disagree", profile: "Artistic" },
      ],
    },
    {
      question: "I like solving complex problems and analyzing data.",
      options: [
        { text: "Strongly Agree", profile: "Investigative" },
        { text: "Agree", profile: "Investigative" },
        { text: "Neutral", profile: "Conventional" },
        { text: "Disagree", profile: "Social" },
        { text: "Strongly Disagree", profile: "Enterprising" },
      ],
    },
    {
      question: "I prefer expressing myself through creative work.",
      options: [
        { text: "Strongly Agree", profile: "Artistic" },
        { text: "Agree", profile: "Artistic" },
        { text: "Neutral", profile: "Social" },
        { text: "Disagree", profile: "Conventional" },
        { text: "Strongly Disagree", profile: "Realistic" },
      ],
    },
    {
      question: "Helping others and making a difference is important to me.",
      options: [
        { text: "Strongly Agree", profile: "Social" },
        { text: "Agree", profile: "Social" },
        { text: "Neutral", profile: "Enterprising" },
        { text: "Disagree", profile: "Realistic" },
        { text: "Strongly Disagree", profile: "Investigative" },
      ],
    },
    {
      question: "I enjoy leading projects and persuading others.",
      options: [
        { text: "Strongly Agree", profile: "Enterprising" },
        { text: "Agree", profile: "Enterprising" },
        { text: "Neutral", profile: "Social" },
        { text: "Disagree", profile: "Conventional" },
        { text: "Strongly Disagree", profile: "Artistic" },
      ],
    },
    {
      question: "I like organizing information and following set procedures.",
      options: [
        { text: "Strongly Agree", profile: "Conventional" },
        { text: "Agree", profile: "Conventional" },
        { text: "Neutral", profile: "Investigative" },
        { text: "Disagree", profile: "Artistic" },
        { text: "Strongly Disagree", profile: "Enterprising" },
      ],
    },
    {
      question: "Working outdoors or with machinery appeals to me.",
      options: [
        { text: "Strongly Agree", profile: "Realistic" },
        { text: "Agree", profile: "Realistic" },
        { text: "Neutral", profile: "Investigative" },
        { text: "Disagree", profile: "Social" },
        { text: "Strongly Disagree", profile: "Conventional" },
      ],
    },
    {
      question: "I enjoy conducting research and discovering new knowledge.",
      options: [
        { text: "Strongly Agree", profile: "Investigative" },
        { text: "Agree", profile: "Investigative" },
        { text: "Neutral", profile: "Realistic" },
        { text: "Disagree", profile: "Enterprising" },
        { text: "Strongly Disagree", profile: "Social" },
      ],
    },
    {
      question: "Creating original designs or writing stories excites me.",
      options: [
        { text: "Strongly Agree", profile: "Artistic" },
        { text: "Agree", profile: "Artistic" },
        { text: "Neutral", profile: "Social" },
        { text: "Disagree", profile: "Conventional" },
        { text: "Strongly Disagree", profile: "Realistic" },
      ],
    },
    {
      question: "Teaching or counseling others is rewarding for me.",
      options: [
        { text: "Strongly Agree", profile: "Social" },
        { text: "Agree", profile: "Social" },
        { text: "Neutral", profile: "Artistic" },
        { text: "Disagree", profile: "Realistic" },
        { text: "Strongly Disagree", profile: "Investigative" },
      ],
    },
    {
      question: "I am comfortable taking risks and starting new ventures.",
      options: [
        { text: "Strongly Agree", profile: "Enterprising" },
        { text: "Agree", profile: "Enterprising" },
        { text: "Neutral", profile: "Social" },
        { text: "Disagree", profile: "Conventional" },
        { text: "Strongly Disagree", profile: "Investigative" },
      ],
    },
    {
      question:
        "I prefer working with numbers and maintaining accurate records.",
      options: [
        { text: "Strongly Agree", profile: "Conventional" },
        { text: "Agree", profile: "Conventional" },
        { text: "Neutral", profile: "Investigative" },
        { text: "Disagree", profile: "Artistic" },
        { text: "Strongly Disagree", profile: "Social" },
      ],
    },
    {
      question: "I enjoy fixing things and understanding how they work.",
      options: [
        { text: "Strongly Agree", profile: "Realistic" },
        { text: "Agree", profile: "Realistic" },
        { text: "Neutral", profile: "Investigative" },
        { text: "Disagree", profile: "Artistic" },
        { text: "Strongly Disagree", profile: "Social" },
      ],
    },
    {
      question: "I like exploring theories and abstract concepts.",
      options: [
        { text: "Strongly Agree", profile: "Investigative" },
        { text: "Agree", profile: "Investigative" },
        { text: "Neutral", profile: "Artistic" },
        { text: "Disagree", profile: "Enterprising" },
        { text: "Strongly Disagree", profile: "Conventional" },
      ],
    },
    {
      question:
        "Performing in front of others or showcasing my work energizes me.",
      options: [
        { text: "Strongly Agree", profile: "Artistic" },
        { text: "Agree", profile: "Artistic" },
        { text: "Neutral", profile: "Enterprising" },
        { text: "Disagree", profile: "Conventional" },
        { text: "Strongly Disagree", profile: "Realistic" },
      ],
    },
  ],
  active: true,
};

const programsData = [
  {
    program_name: "B.Tech Computer Science",
    degree_type: "B.Tech",
    description:
      "Focuses on algorithms, software design, data structures, and computing theory. Ideal for those who love problem-solving and technology.",
    duration: "4 years",
    interest_tags: ["Investigative", "Realistic"],
    career_paths: [
      "Software Engineer",
      "Data Scientist",
      "AI/ML Engineer",
      "System Architect",
      "Cybersecurity Analyst",
    ],
    average_salary: "₹6-15 LPA",
    skills_required: [
      "Programming",
      "Logical Thinking",
      "Problem Solving",
      "Mathematics",
    ],
    eligibility:
      "10+2 with Physics, Chemistry, and Mathematics. Entrance: JEE Main, JEE Advanced, State CETs",
  },
  {
    program_name: "B.Sc. Nursing",
    degree_type: "B.Sc",
    description:
      "Combines medical science with compassionate patient care. Perfect for those who want to help people and work in healthcare.",
    duration: "4 years",
    interest_tags: ["Social", "Investigative", "Realistic"],
    career_paths: [
      "Registered Nurse",
      "Nurse Practitioner",
      "Healthcare Administrator",
      "Clinical Nurse Specialist",
    ],
    average_salary: "₹3-7 LPA",
    skills_required: [
      "Empathy",
      "Communication",
      "Medical Knowledge",
      "Attention to Detail",
    ],
    eligibility:
      "10+2 with Physics, Chemistry, and Biology. Entrance: NEET (for some institutions)",
  },
  {
    program_name: "BBA in Marketing",
    degree_type: "BBA",
    description:
      "Learn about market strategy, branding, consumer behavior, and business management. Great for natural leaders and persuaders.",
    duration: "3 years",
    interest_tags: ["Enterprising", "Artistic", "Social"],
    career_paths: [
      "Marketing Manager",
      "Brand Manager",
      "Digital Marketing Specialist",
      "Sales Manager",
      "Business Development Executive",
    ],
    average_salary: "₹4-10 LPA",
    skills_required: [
      "Communication",
      "Creativity",
      "Analytical Thinking",
      "Leadership",
    ],
    eligibility:
      "10+2 from any stream. Entrance: Some universities conduct their own entrance exams",
  },
  {
    program_name: "B.Com in Accounting",
    degree_type: "B.Com",
    description:
      "Master financial principles, tax law, auditing, and accounting systems. Perfect for detail-oriented individuals who love working with numbers.",
    duration: "3 years",
    interest_tags: ["Conventional", "Investigative"],
    career_paths: [
      "Chartered Accountant",
      "Tax Consultant",
      "Auditor",
      "Financial Analyst",
      "Accounts Manager",
    ],
    average_salary: "₹3-8 LPA",
    skills_required: [
      "Numerical Skills",
      "Attention to Detail",
      "Analytical Thinking",
      "Integrity",
    ],
    eligibility: "10+2 with Commerce (preferred) or any stream",
  },
  {
    program_name: "B.Des Graphic Design",
    degree_type: "Other",
    description:
      "Explore visual communication, typography, illustration, and digital design. Ideal for creative individuals with artistic vision.",
    duration: "4 years",
    interest_tags: ["Artistic", "Enterprising"],
    career_paths: [
      "Graphic Designer",
      "UI/UX Designer",
      "Art Director",
      "Creative Director",
      "Freelance Designer",
    ],
    average_salary: "₹4-12 LPA",
    skills_required: [
      "Creativity",
      "Design Software",
      "Visual Communication",
      "Innovation",
    ],
    eligibility:
      "10+2 from any stream. Entrance: Design aptitude tests (NID, NIFT, etc.)",
  },
  {
    program_name: "B.Tech Mechanical Engineering",
    degree_type: "B.Tech",
    description:
      "Study mechanics, thermodynamics, and manufacturing processes. Perfect for those who love machines and hands-on engineering.",
    duration: "4 years",
    interest_tags: ["Realistic", "Investigative"],
    career_paths: [
      "Mechanical Engineer",
      "Manufacturing Engineer",
      "Automotive Engineer",
      "HVAC Engineer",
      "Robotics Engineer",
    ],
    average_salary: "₹5-12 LPA",
    skills_required: [
      "Technical Skills",
      "Problem Solving",
      "Mathematics",
      "CAD Software",
    ],
    eligibility:
      "10+2 with Physics, Chemistry, and Mathematics. Entrance: JEE Main, JEE Advanced",
  },
  {
    program_name: "BA Psychology",
    degree_type: "BA",
    description:
      "Study human behavior, mental processes, and counseling techniques. Great for empathetic individuals interested in understanding people.",
    duration: "3 years",
    interest_tags: ["Social", "Investigative"],
    career_paths: [
      "Clinical Psychologist",
      "Counselor",
      "HR Professional",
      "Social Worker",
      "Research Psychologist",
    ],
    average_salary: "₹3-8 LPA",
    skills_required: [
      "Empathy",
      "Active Listening",
      "Analytical Thinking",
      "Communication",
    ],
    eligibility: "10+2 from any stream",
  },
  {
    program_name: "BCA (Computer Applications)",
    degree_type: "BCA",
    description:
      "Focus on software development, programming, and computer applications. Suitable for tech enthusiasts wanting practical skills.",
    duration: "3 years",
    interest_tags: ["Investigative", "Realistic"],
    career_paths: [
      "Software Developer",
      "Web Developer",
      "Database Administrator",
      "System Analyst",
      "IT Consultant",
    ],
    average_salary: "₹4-10 LPA",
    skills_required: [
      "Programming",
      "Logical Thinking",
      "Problem Solving",
      "Database Management",
    ],
    eligibility: "10+2 with Mathematics (required by most universities)",
  },
  {
    program_name: "B.Arch Architecture",
    degree_type: "B.Arch",
    description:
      "Design buildings and structures blending creativity with technical knowledge. Perfect for artistic and realistic individuals.",
    duration: "5 years",
    interest_tags: ["Artistic", "Realistic", "Investigative"],
    career_paths: [
      "Architect",
      "Urban Planner",
      "Landscape Architect",
      "Interior Designer",
      "Architectural Consultant",
    ],
    average_salary: "₹5-15 LPA",
    skills_required: [
      "Creativity",
      "Technical Drawing",
      "Visualization",
      "Mathematics",
      "Design Software",
    ],
    eligibility:
      "10+2 with Physics, Chemistry, and Mathematics. Entrance: NATA, JEE Main Paper 2",
  },
  {
    program_name: "BBA in Entrepreneurship",
    degree_type: "BBA",
    description:
      "Learn to start and manage your own business ventures. Perfect for risk-takers and innovators.",
    duration: "3 years",
    interest_tags: ["Enterprising", "Social"],
    career_paths: [
      "Entrepreneur",
      "Business Consultant",
      "Startup Founder",
      "Business Analyst",
      "Venture Capitalist",
    ],
    average_salary: "₹5-20 LPA (varies widely)",
    skills_required: [
      "Leadership",
      "Risk Management",
      "Innovation",
      "Strategic Thinking",
    ],
    eligibility: "10+2 from any stream",
  },
];

const collegesData = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    type: "Public",
    location: { city: "Mumbai", state: "Maharashtra", country: "India" },
    established: 1958,
    accreditation: ["NAAC A++", "NBA", "AICTE"],
    ranking: { nirf: 3, overall: 1 },
    admission_info: {
      application_deadline: "June 2025",
      entrance_exams: ["JEE Advanced"],
      cutoff_details: "JEE Advanced rank under 2000 for Computer Science",
    },
    fees: { annual_tuition: "₹2,00,000", hostel_fees: "₹15,000" },
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Research Centers",
    ],
    placement_stats: {
      average_package: "₹20 LPA",
      highest_package: "₹1.2 Cr",
      placement_percentage: "95%",
      top_recruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
    },
    website: "https://www.iitb.ac.in",
    contact: {
      email: "info@iitb.ac.in",
      phone: "+91-22-2576-4040",
      address: "Powai, Mumbai, Maharashtra 400076",
    },
  },
  {
    name: "All India Institute of Medical Sciences (AIIMS) Delhi",
    type: "Public",
    location: { city: "New Delhi", state: "Delhi", country: "India" },
    established: 1956,
    accreditation: ["NAAC A++", "Medical Council of India"],
    ranking: { nirf: 1, overall: 1 },
    admission_info: {
      application_deadline: "March 2025",
      entrance_exams: ["NEET UG", "NEET PG"],
      cutoff_details: "NEET rank under 500 for MBBS",
    },
    fees: { annual_tuition: "₹1,464", hostel_fees: "₹8,000" },
    facilities: ["Hospital", "Research Labs", "Library", "Hostel", "Sports"],
    placement_stats: {
      average_package: "₹12 LPA",
      highest_package: "₹40 LPA",
      placement_percentage: "100%",
      top_recruiters: [
        "Apollo Hospitals",
        "Fortis",
        "Max Healthcare",
        "Medanta",
      ],
    },
    website: "https://www.aiims.edu",
    contact: {
      email: "aiims@aiims.edu",
      phone: "+91-11-2658-8500",
      address: "Ansari Nagar, New Delhi, Delhi 110029",
    },
  },
  {
    name: "Symbiosis Institute of Business Management (SIBM)",
    type: "Private",
    location: { city: "Pune", state: "Maharashtra", country: "India" },
    established: 1978,
    accreditation: ["NAAC A", "AICTE", "NBA"],
    ranking: { nirf: 25, overall: 30 },
    admission_info: {
      application_deadline: "January 2025",
      entrance_exams: ["SNAP", "CAT"],
      cutoff_details: "SNAP percentile above 95",
    },
    fees: { annual_tuition: "₹5,50,000", hostel_fees: "₹1,50,000" },
    facilities: [
      "AC Classrooms",
      "Library",
      "Computer Labs",
      "Cafeteria",
      "Sports Complex",
    ],
    placement_stats: {
      average_package: "₹15 LPA",
      highest_package: "₹45 LPA",
      placement_percentage: "98%",
      top_recruiters: ["Deloitte", "KPMG", "Accenture", "Amazon", "ITC"],
    },
    website: "https://www.sibm.edu",
    contact: {
      email: "sibm@symbiosis.ac.in",
      phone: "+91-20-2293-8000",
      address: "Gram Lavale, Pune, Maharashtra 412115",
    },
  },
  {
    name: "Shri Ram College of Commerce (SRCC)",
    type: "Public",
    location: { city: "New Delhi", state: "Delhi", country: "India" },
    established: 1926,
    accreditation: ["NAAC A++", "University of Delhi"],
    ranking: { nirf: 2, overall: 5 },
    admission_info: {
      application_deadline: "July 2025",
      entrance_exams: ["CUET"],
      cutoff_details: "99%+ in Best Four for B.Com (Hons)",
    },
    fees: { annual_tuition: "₹25,000", hostel_fees: "N/A (Day College)" },
    facilities: [
      "Library",
      "Computer Labs",
      "Auditorium",
      "Sports",
      "Societies",
    ],
    placement_stats: {
      average_package: "₹10 LPA",
      highest_package: "₹32 LPA",
      placement_percentage: "100%",
      top_recruiters: ["EY", "Deloitte", "PwC", "KPMG", "JP Morgan"],
    },
    website: "https://www.srcc.edu",
    contact: {
      email: "principal@srcc.du.ac.in",
      phone: "+91-11-2766-7691",
      address: "Maurice Nagar, New Delhi, Delhi 110007",
    },
  },
  {
    name: "National Institute of Design (NID) Ahmedabad",
    type: "Public",
    location: { city: "Ahmedabad", state: "Gujarat", country: "India" },
    established: 1961,
    accreditation: ["Institute of National Importance"],
    ranking: { nirf: 1, overall: 1 },
    admission_info: {
      application_deadline: "December 2024",
      entrance_exams: ["NID DAT"],
      cutoff_details: "Portfolio review and Studio test",
    },
    fees: { annual_tuition: "₹2,50,000", hostel_fees: "₹80,000" },
    facilities: [
      "Design Studios",
      "Workshops",
      "Library",
      "Hostel",
      "Exhibition Spaces",
    ],
    placement_stats: {
      average_package: "₹12 LPA",
      highest_package: "₹35 LPA",
      placement_percentage: "90%",
      top_recruiters: ["Adobe", "Philips", "Microsoft", "Samsung", "Titan"],
    },
    website: "https://www.nid.edu",
    contact: {
      email: "info@nid.edu",
      phone: "+91-79-2662-3692",
      address: "Paldi, Ahmedabad, Gujarat 380007",
    },
  },
  {
    name: "Manipal Institute of Technology",
    type: "Private",
    location: { city: "Manipal", state: "Karnataka", country: "India" },
    established: 1957,
    accreditation: ["NAAC A++", "NBA", "AICTE"],
    ranking: { nirf: 47, overall: 55 },
    admission_info: {
      application_deadline: "May 2025",
      entrance_exams: ["MET (Manipal Entrance Test)", "JEE Main"],
      cutoff_details: "MET rank under 5000 for Computer Science",
    },
    fees: { annual_tuition: "₹3,50,000", hostel_fees: "₹1,20,000" },
    facilities: [
      "Modern Labs",
      "Library",
      "Sports Complex",
      "Hostel",
      "Innovation Center",
    ],
    placement_stats: {
      average_package: "₹8 LPA",
      highest_package: "₹45 LPA",
      placement_percentage: "92%",
      top_recruiters: ["Microsoft", "Amazon", "Oracle", "Infosys", "Wipro"],
    },
    website: "https://www.manipal.edu/mit.html",
    contact: {
      email: "mit@manipal.edu",
      phone: "+91-820-292-3777",
      address: "Manipal, Karnataka 576104",
    },
  },
  {
    name: "Christ University",
    type: "Private",
    location: { city: "Bangalore", state: "Karnataka", country: "India" },
    established: 1969,
    accreditation: ["NAAC A++", "UGC"],
    ranking: { nirf: 32, overall: 40 },
    admission_info: {
      application_deadline: "April 2025",
      entrance_exams: ["Christ University Entrance Test"],
      cutoff_details: "Varies by program, interview required",
    },
    fees: { annual_tuition: "₹2,00,000", hostel_fees: "₹80,000" },
    facilities: [
      "Library",
      "Labs",
      "Sports",
      "Auditorium",
      "Hostel",
      "Counseling Center",
    ],
    placement_stats: {
      average_package: "₹6 LPA",
      highest_package: "₹22 LPA",
      placement_percentage: "85%",
      top_recruiters: ["Deloitte", "EY", "KPMG", "Infosys", "TCS"],
    },
    website: "https://www.christuniversity.in",
    contact: {
      email: "info@christuniversity.in",
      phone: "+91-80-4012-9292",
      address: "Hosur Road, Bangalore, Karnataka 560029",
    },
  },
  {
    name: "Jamia Millia Islamia",
    type: "Public",
    location: { city: "New Delhi", state: "Delhi", country: "India" },
    established: 1920,
    accreditation: ["NAAC A++", "UGC"],
    ranking: { nirf: 3, overall: 12 },
    admission_info: {
      application_deadline: "June 2025",
      entrance_exams: ["JMI Entrance Exam", "CUET"],
      cutoff_details: "Varies by program",
    },
    fees: { annual_tuition: "₹25,000", hostel_fees: "₹15,000" },
    facilities: [
      "Library",
      "Labs",
      "Sports Complex",
      "Hostel",
      "Medical Center",
    ],
    placement_stats: {
      average_package: "₹7 LPA",
      highest_package: "₹25 LPA",
      placement_percentage: "80%",
      top_recruiters: ["TCS", "Wipro", "HCL", "Tech Mahindra", "IBM"],
    },
    website: "https://www.jmi.ac.in",
    contact: {
      email: "info@jmi.ac.in",
      phone: "+91-11-2698-1717",
      address: "Jamia Nagar, New Delhi, Delhi 110025",
    },
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
    );
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await Quiz.deleteMany({});
    await Program.deleteMany({});
    await College.deleteMany({});
    console.log("Cleared existing data");

    // Insert Quiz
    const quiz = await Quiz.create(quizData);
    console.log("Quiz data inserted");

    // Insert Colleges first (to get IDs for programs)
    const colleges = await College.insertMany(collegesData);
    console.log(`${colleges.length} colleges inserted`);

    // Create a mapping of program types to college IDs
    const collegeMap = {
      "B.Tech Computer Science": [colleges[0]._id, colleges[5]._id], // IIT Bombay, Manipal
      "B.Sc. Nursing": [colleges[1]._id], // AIIMS
      "BBA in Marketing": [colleges[2]._id, colleges[6]._id], // SIBM, Christ
      "B.Com in Accounting": [colleges[3]._id, colleges[6]._id], // SRCC, Christ
      "B.Des Graphic Design": [colleges[4]._id], // NID
      "B.Tech Mechanical Engineering": [colleges[0]._id, colleges[5]._id], // IIT Bombay, Manipal
      "BA Psychology": [colleges[6]._id, colleges[7]._id], // Christ, Jamia
      "BCA (Computer Applications)": [
        colleges[5]._id,
        colleges[6]._id,
        colleges[7]._id,
      ], // Manipal, Christ, Jamia
      "B.Arch Architecture": [colleges[0]._id], // IIT Bombay
      "BBA in Entrepreneurship": [colleges[2]._id, colleges[6]._id], // SIBM, Christ
    };

    // Add college IDs to programs
    const programsWithColleges = programsData.map((program) => ({
      ...program,
      college_ids: collegeMap[program.program_name] || [],
    }));

    // Insert Programs
    const programs = await Program.insertMany(programsWithColleges);
    console.log(`${programs.length} programs inserted`);

    // Update colleges with program references
    for (const college of colleges) {
      const collegeProgramIds = programs
        .filter((program) =>
          program.college_ids.some((id) => id.equals(college._id))
        )
        .map((program) => program._id);

      await College.findByIdAndUpdate(college._id, {
        programs_offered: collegeProgramIds,
      });
    }
    console.log("College-Program relationships updated");

    console.log("✅ Database seeded successfully!");
    console.log(`
Summary:
- Quiz questions: ${quiz.questions.length}
- Programs: ${programs.length}
- Colleges: ${colleges.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
