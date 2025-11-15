import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "../models/College.js";
import Program from "../models/Program.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep"
);

const add20Colleges = async () => {
  try {
    console.log("🌱 Adding 20 new Indian colleges...\n");

    // Fetch existing programs to link with colleges
    const programs = await Program.find({});
    const programMap = {};
    programs.forEach((p) => {
      programMap[p.program_name] = p._id;
    });

    // BATCH 1: First 5 Colleges
    console.log("📚 Adding Batch 1 (Colleges 1-5)...");
    const batch1 = await College.insertMany([
      {
        name: "Vellore Institute of Technology (VIT)",
        type: "Private",
        location: {
          city: "Vellore",
          state: "Tamil Nadu",
          country: "India",
        },
        established: 1984,
        accreditation: ["NAAC A++", "NBA", "AICTE"],
        ranking: {
          nirf: 11,
          overall: 15,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["VITEEE"],
          cutoff_details: "VITEEE rank under 10000 for CS",
          applicationLink: "https://vit.ac.in",
        },
        fees: {
          annual_tuition: "₹1,98,000",
          hostel_fees: "₹75,000",
        },
        facilities: [
          "Modern Labs",
          "Library",
          "Sports Complex",
          "Hostel",
          "Innovation Center",
        ],
        placement_stats: {
          average_package: "₹7.5 LPA",
          highest_package: "₹41 LPA",
          placement_percentage: "94%",
          top_recruiters: ["Cognizant", "Wipro", "TCS", "Infosys", "Accenture"],
        },
        website: "https://vit.ac.in",
        contact: {
          email: "admissions@vit.ac.in",
          phone: "+91-416-220-2000",
          address: "Vellore, Tamil Nadu 632014",
        },
      },
      {
        name: "Birla Institute of Technology and Science (BITS) Pilani",
        type: "Private",
        location: {
          city: "Pilani",
          state: "Rajasthan",
          country: "India",
        },
        established: 1964,
        accreditation: ["NAAC A", "NBA", "AICTE"],
        ranking: {
          nirf: 30,
          overall: 28,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
        ],
        admission_info: {
          application_deadline: "May 2025",
          entrance_exams: ["BITSAT"],
          cutoff_details: "BITSAT score above 300",
          applicationLink: "https://www.bits-pilani.ac.in",
        },
        fees: {
          annual_tuition: "₹4,45,000",
          hostel_fees: "₹90,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Research Centers"],
        placement_stats: {
          average_package: "₹18 LPA",
          highest_package: "₹60 LPA",
          placement_percentage: "96%",
          top_recruiters: [
            "Microsoft",
            "Google",
            "Amazon",
            "Goldman Sachs",
            "DE Shaw",
          ],
        },
        website: "https://www.bits-pilani.ac.in",
        contact: {
          email: "admissions@pilani.bits-pilani.ac.in",
          phone: "+91-1596-242-210",
          address: "Pilani, Rajasthan 333031",
        },
      },
      {
        name: "Amity University",
        type: "Private",
        location: {
          city: "Noida",
          state: "Uttar Pradesh",
          country: "India",
        },
        established: 2005,
        accreditation: ["NAAC A+", "UGC"],
        ranking: {
          nirf: 45,
          overall: 50,
        },
        programs_offered: [
          programMap["BBA in Marketing"],
          programMap["B.Com in Accounting"],
          programMap["BA Psychology"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "April 2025",
          entrance_exams: ["Amity Entrance Exam"],
          cutoff_details: "Merit-based admission",
          applicationLink: "https://www.amity.edu",
        },
        fees: {
          annual_tuition: "₹2,50,000",
          hostel_fees: "₹1,00,000",
        },
        facilities: [
          "Modern Campus",
          "Library",
          "Labs",
          "Sports Complex",
          "Hostel",
        ],
        placement_stats: {
          average_package: "₹5 LPA",
          highest_package: "₹18 LPA",
          placement_percentage: "80%",
          top_recruiters: [
            "HCL",
            "Tech Mahindra",
            "Wipro",
            "Amazon",
            "Flipkart",
          ],
        },
        website: "https://www.amity.edu",
        contact: {
          email: "info@amity.edu",
          phone: "+91-120-471-5000",
          address: "Sector 125, Noida, Uttar Pradesh 201313",
        },
      },
      {
        name: "Lovely Professional University (LPU)",
        type: "Private",
        location: {
          city: "Phagwara",
          state: "Punjab",
          country: "India",
        },
        established: 2005,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 52,
          overall: 60,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BBA in Marketing"],
          programMap["B.Des Graphic Design"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["LPUNEST"],
          cutoff_details: "Based on 10+2 and entrance exam",
          applicationLink: "https://www.lpu.in",
        },
        fees: {
          annual_tuition: "₹1,60,000",
          hostel_fees: "₹80,000",
        },
        facilities: [
          "International Campus",
          "Library",
          "Labs",
          "Sports",
          "Hostel",
        ],
        placement_stats: {
          average_package: "₹5.5 LPA",
          highest_package: "₹42 LPA",
          placement_percentage: "85%",
          top_recruiters: ["Amazon", "Microsoft", "Google", "Cognizant", "TCS"],
        },
        website: "https://www.lpu.in",
        contact: {
          email: "info@lpu.co.in",
          phone: "+91-1824-404-404",
          address: "Phagwara, Punjab 144411",
        },
      },
      {
        name: "Delhi University - St. Stephen's College",
        type: "Public",
        location: {
          city: "New Delhi",
          state: "Delhi",
          country: "India",
        },
        established: 1881,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 2,
          overall: 3,
        },
        programs_offered: [
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
        ],
        admission_info: {
          application_deadline: "July 2025",
          entrance_exams: ["CUET"],
          cutoff_details: "99%+ for most courses",
          applicationLink: "https://www.ststephens.edu",
        },
        fees: {
          annual_tuition: "₹30,000",
          hostel_fees: "₹20,000",
        },
        facilities: ["Library", "Labs", "Sports", "Chapel", "Hostel"],
        placement_stats: {
          average_package: "₹12 LPA",
          highest_package: "₹35 LPA",
          placement_percentage: "95%",
          top_recruiters: [
            "McKinsey",
            "BCG",
            "Deloitte",
            "EY",
            "Goldman Sachs",
          ],
        },
        website: "https://www.ststephens.edu",
        contact: {
          email: "principal@ststephens.edu",
          phone: "+91-11-2766-7271",
          address: "University Enclave, New Delhi, Delhi 110007",
        },
      },
    ]);
    console.log(`✓ Added ${batch1.length} colleges (Batch 1)\n`);

    // BATCH 2: Colleges 6-10
    console.log("📚 Adding Batch 2 (Colleges 6-10)...");
    const batch2 = await College.insertMany([
      {
        name: "Anna University",
        type: "Public",
        location: {
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
        },
        established: 1978,
        accreditation: ["NAAC A++", "NBA", "AICTE"],
        ranking: {
          nirf: 14,
          overall: 18,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
          programMap["B.Arch Architecture"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["TNEA"],
          cutoff_details: "State rank based admission",
          applicationLink: "https://www.annauniv.edu",
        },
        fees: {
          annual_tuition: "₹50,000",
          hostel_fees: "₹25,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Research Centers"],
        placement_stats: {
          average_package: "₹5.5 LPA",
          highest_package: "₹25 LPA",
          placement_percentage: "85%",
          top_recruiters: ["Infosys", "TCS", "Wipro", "Cognizant", "HCL"],
        },
        website: "https://www.annauniv.edu",
        contact: {
          email: "registrar@annauniv.edu",
          phone: "+91-44-2235-8712",
          address: "Sardar Patel Road, Chennai, Tamil Nadu 600025",
        },
      },
      {
        name: "Jadavpur University",
        type: "Public",
        location: {
          city: "Kolkata",
          state: "West Bengal",
          country: "India",
        },
        established: 1955,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 12,
          overall: 16,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
          programMap["BA Psychology"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["WBJEE", "JEE Main"],
          cutoff_details: "State and national rank based",
          applicationLink: "http://www.jadavpur.edu",
        },
        fees: {
          annual_tuition: "₹15,000",
          hostel_fees: "₹12,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Research Labs"],
        placement_stats: {
          average_package: "₹9 LPA",
          highest_package: "₹39 LPA",
          placement_percentage: "90%",
          top_recruiters: ["Microsoft", "Amazon", "Google", "TCS", "Wipro"],
        },
        website: "http://www.jadavpur.edu",
        contact: {
          email: "registrar@jadavpuruniversity.in",
          phone: "+91-33-2414-6666",
          address: "Raja S.C. Mullick Road, Kolkata, West Bengal 700032",
        },
      },
      {
        name: "Pune University - Fergusson College",
        type: "Public",
        location: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
        },
        established: 1885,
        accreditation: ["NAAC A++"],
        ranking: {
          nirf: 35,
          overall: 42,
        },
        programs_offered: [
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "July 2025",
          entrance_exams: ["Maharashtra CET"],
          cutoff_details: "Merit-based",
          applicationLink: "https://fergusson.edu",
        },
        fees: {
          annual_tuition: "₹20,000",
          hostel_fees: "₹15,000",
        },
        facilities: ["Library", "Labs", "Sports", "Auditorium"],
        placement_stats: {
          average_package: "₹4.5 LPA",
          highest_package: "₹15 LPA",
          placement_percentage: "75%",
          top_recruiters: ["Infosys", "TCS", "Wipro", "ICICI", "HDFC"],
        },
        website: "https://fergusson.edu",
        contact: {
          email: "principal@fergusson.edu",
          phone: "+91-20-2565-2240",
          address: "Fergusson College Road, Pune, Maharashtra 411004",
        },
      },
      {
        name: "National Law School of India University (NLSIU)",
        type: "Public",
        location: {
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
        },
        established: 1987,
        accreditation: ["NAAC A++", "BCI"],
        ranking: {
          nirf: 1,
          overall: 2,
        },
        programs_offered: [],
        admission_info: {
          application_deadline: "May 2025",
          entrance_exams: ["CLAT"],
          cutoff_details: "CLAT All India Rank under 100",
          applicationLink: "https://www.nls.ac.in",
        },
        fees: {
          annual_tuition: "₹2,25,000",
          hostel_fees: "₹60,000",
        },
        facilities: [
          "Law Library",
          "Moot Court",
          "Research Centers",
          "Hostel",
          "Sports",
        ],
        placement_stats: {
          average_package: "₹15 LPA",
          highest_package: "₹25 LPA",
          placement_percentage: "100%",
          top_recruiters: [
            "Amarchand Mangaldas",
            "Trilegal",
            "AZB & Partners",
            "Cyril Amarchand",
          ],
        },
        website: "https://www.nls.ac.in",
        contact: {
          email: "registrar@nls.ac.in",
          phone: "+91-80-2316-0532",
          address: "Nagarbhavi, Bangalore, Karnataka 560242",
        },
      },
      {
        name: "Jawaharlal Nehru University (JNU)",
        type: "Public",
        location: {
          city: "New Delhi",
          state: "Delhi",
          country: "India",
        },
        established: 1969,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 2,
          overall: 3,
        },
        programs_offered: [programMap["BA Psychology"]],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["CUET"],
          cutoff_details: "High cutoff based on entrance exam",
          applicationLink: "https://www.jnu.ac.in",
        },
        fees: {
          annual_tuition: "₹300",
          hostel_fees: "₹1,320",
        },
        facilities: [
          "Central Library",
          "Labs",
          "Sports Complex",
          "Hostel",
          "Medical Center",
        ],
        placement_stats: {
          average_package: "₹8 LPA",
          highest_package: "₹20 LPA",
          placement_percentage: "80%",
          top_recruiters: ["UN Bodies", "NGOs", "Research Institutes", "Media"],
        },
        website: "https://www.jnu.ac.in",
        contact: {
          email: "registrar@mail.jnu.ac.in",
          phone: "+91-11-2670-4000",
          address: "New Mehrauli Road, New Delhi, Delhi 110067",
        },
      },
    ]);
    console.log(`✓ Added ${batch2.length} colleges (Batch 2)\n`);

    // BATCH 3: Colleges 11-15
    console.log("📚 Adding Batch 3 (Colleges 11-15)...");
    const batch3 = await College.insertMany([
      {
        name: "Banaras Hindu University (BHU)",
        type: "Public",
        location: {
          city: "Varanasi",
          state: "Uttar Pradesh",
          country: "India",
        },
        established: 1916,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 10,
          overall: 12,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["BHU UET", "JEE Main"],
          cutoff_details: "Varies by program",
          applicationLink: "https://www.bhu.ac.in",
        },
        fees: {
          annual_tuition: "₹15,000",
          hostel_fees: "₹10,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Medical Center"],
        placement_stats: {
          average_package: "₹7 LPA",
          highest_package: "₹28 LPA",
          placement_percentage: "85%",
          top_recruiters: ["TCS", "Wipro", "Infosys", "Amazon", "Microsoft"],
        },
        website: "https://www.bhu.ac.in",
        contact: {
          email: "registrar@bhu.ac.in",
          phone: "+91-542-230-7000",
          address: "Varanasi, Uttar Pradesh 221005",
        },
      },
      {
        name: "Aligarh Muslim University (AMU)",
        type: "Public",
        location: {
          city: "Aligarh",
          state: "Uttar Pradesh",
          country: "India",
        },
        established: 1920,
        accreditation: ["NAAC A", "UGC"],
        ranking: {
          nirf: 8,
          overall: 11,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
        ],
        admission_info: {
          application_deadline: "May 2025",
          entrance_exams: ["AMUEEE"],
          cutoff_details: "Entrance exam based",
          applicationLink: "https://www.amu.ac.in",
        },
        fees: {
          annual_tuition: "₹10,000",
          hostel_fees: "₹8,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Medical College"],
        placement_stats: {
          average_package: "₹6 LPA",
          highest_package: "₹22 LPA",
          placement_percentage: "80%",
          top_recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra"],
        },
        website: "https://www.amu.ac.in",
        contact: {
          email: "registrar@amu.ac.in",
          phone: "+91-571-270-0920",
          address: "Aligarh, Uttar Pradesh 202002",
        },
      },
      {
        name: "SRM Institute of Science and Technology",
        type: "Private",
        location: {
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
        },
        established: 1985,
        accreditation: ["NAAC A++", "NBA", "AICTE"],
        ranking: {
          nirf: 41,
          overall: 48,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["SRMJEEE"],
          cutoff_details: "SRMJEEE rank under 15000",
          applicationLink: "https://www.srmist.edu.in",
        },
        fees: {
          annual_tuition: "₹2,50,000",
          hostel_fees: "₹90,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Research Centers"],
        placement_stats: {
          average_package: "₹6.5 LPA",
          highest_package: "₹32 LPA",
          placement_percentage: "88%",
          top_recruiters: ["Amazon", "Cognizant", "Infosys", "TCS", "Wipro"],
        },
        website: "https://www.srmist.edu.in",
        contact: {
          email: "admissions@srmist.edu.in",
          phone: "+91-44-2741-7000",
          address: "Kattankulathur, Chennai, Tamil Nadu 603203",
        },
      },
      {
        name: "JSS Academy of Higher Education & Research",
        type: "Private",
        location: {
          city: "Mysuru",
          state: "Karnataka",
          country: "India",
        },
        established: 2008,
        accreditation: ["NAAC A", "UGC"],
        ranking: {
          nirf: 38,
          overall: 45,
        },
        programs_offered: [
          programMap["B.Sc. Nursing"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "May 2025",
          entrance_exams: ["NEET", "KCET"],
          cutoff_details: "Based on entrance exam",
          applicationLink: "https://www.jssuni.edu.in",
        },
        fees: {
          annual_tuition: "₹1,50,000",
          hostel_fees: "₹70,000",
        },
        facilities: ["Hospital", "Labs", "Library", "Sports", "Hostel"],
        placement_stats: {
          average_package: "₹4.5 LPA",
          highest_package: "₹12 LPA",
          placement_percentage: "82%",
          top_recruiters: [
            "Apollo Hospitals",
            "Manipal Hospitals",
            "Infosys",
            "Wipro",
          ],
        },
        website: "https://www.jssuni.edu.in",
        contact: {
          email: "info@jssuni.edu.in",
          phone: "+91-821-2548-400",
          address: "Sri Shivarathreeshwara Nagar, Mysuru, Karnataka 570015",
        },
      },
      {
        name: "Chandigarh University",
        type: "Private",
        location: {
          city: "Mohali",
          state: "Punjab",
          country: "India",
        },
        established: 2012,
        accreditation: ["NAAC A+", "UGC"],
        ranking: {
          nirf: 61,
          overall: 70,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BBA in Marketing"],
          programMap["B.Des Graphic Design"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["CUCET"],
          cutoff_details: "Merit-based",
          applicationLink: "https://www.cuchd.in",
        },
        fees: {
          annual_tuition: "₹1,60,000",
          hostel_fees: "₹75,000",
        },
        facilities: ["Modern Campus", "Library", "Labs", "Sports", "Hostel"],
        placement_stats: {
          average_package: "₹5.2 LPA",
          highest_package: "₹31 LPA",
          placement_percentage: "83%",
          top_recruiters: ["Microsoft", "Amazon", "Google", "Infosys", "Wipro"],
        },
        website: "https://www.cuchd.in",
        contact: {
          email: "admissions@cuchd.in",
          phone: "+91-160-300-5000",
          address: "NH-95, Mohali, Punjab 140413",
        },
      },
    ]);
    console.log(`✓ Added ${batch3.length} colleges (Batch 3)\n`);

    // BATCH 4: Colleges 16-20
    console.log("📚 Adding Batch 4 (Colleges 16-20)...");
    const batch4 = await College.insertMany([
      {
        name: "Savitribai Phule Pune University",
        type: "Public",
        location: {
          city: "Pune",
          state: "Maharashtra",
          country: "India",
        },
        established: 1949,
        accreditation: ["NAAC A", "UGC"],
        ranking: {
          nirf: 22,
          overall: 28,
        },
        programs_offered: [
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "July 2025",
          entrance_exams: ["Maharashtra CET"],
          cutoff_details: "Merit-based",
          applicationLink: "http://www.unipune.ac.in",
        },
        fees: {
          annual_tuition: "₹18,000",
          hostel_fees: "₹12,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel"],
        placement_stats: {
          average_package: "₹4 LPA",
          highest_package: "₹12 LPA",
          placement_percentage: "70%",
          top_recruiters: ["TCS", "Infosys", "Wipro", "Cognizant"],
        },
        website: "http://www.unipune.ac.in",
        contact: {
          email: "registrar@unipune.ac.in",
          phone: "+91-20-2560-1000",
          address: "Ganeshkhind, Pune, Maharashtra 411007",
        },
      },
      {
        name: "Thapar Institute of Engineering & Technology",
        type: "Private",
        location: {
          city: "Patiala",
          state: "Punjab",
          country: "India",
        },
        established: 1956,
        accreditation: ["NAAC A", "NBA", "AICTE"],
        ranking: {
          nirf: 29,
          overall: 35,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["B.Tech Mechanical Engineering"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["JEE Main"],
          cutoff_details: "JEE Main rank under 20000",
          applicationLink: "https://www.thapar.edu",
        },
        fees: {
          annual_tuition: "₹3,25,000",
          hostel_fees: "₹1,10,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Innovation Lab"],
        placement_stats: {
          average_package: "₹10 LPA",
          highest_package: "₹43 LPA",
          placement_percentage: "92%",
          top_recruiters: ["Microsoft", "Amazon", "Adobe", "Oracle", "Samsung"],
        },
        website: "https://www.thapar.edu",
        contact: {
          email: "admissions@thapar.edu",
          phone: "+91-175-239-3021",
          address: "Bhadson Road, Patiala, Punjab 147004",
        },
      },
      {
        name: "Bennett University",
        type: "Private",
        location: {
          city: "Greater Noida",
          state: "Uttar Pradesh",
          country: "India",
        },
        established: 2016,
        accreditation: ["NAAC A", "UGC"],
        ranking: {
          nirf: 75,
          overall: 85,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BBA in Marketing"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "May 2025",
          entrance_exams: ["JEE Main", "Bennett Entrance Test"],
          cutoff_details: "JEE Main percentile 75+",
          applicationLink: "https://www.bennett.edu.in",
        },
        fees: {
          annual_tuition: "₹2,95,000",
          hostel_fees: "₹1,35,000",
        },
        facilities: [
          "Modern Campus",
          "Library",
          "Labs",
          "Sports Complex",
          "Hostel",
        ],
        placement_stats: {
          average_package: "₹6.5 LPA",
          highest_package: "₹21 LPA",
          placement_percentage: "86%",
          top_recruiters: ["Amazon", "Cognizant", "Wipro", "TCS", "Accenture"],
        },
        website: "https://www.bennett.edu.in",
        contact: {
          email: "info@bennett.edu.in",
          phone: "+91-120-711-1600",
          address: "Plot No. 8-11, Greater Noida, Uttar Pradesh 201310",
        },
      },
      {
        name: "Kalinga Institute of Industrial Technology (KIIT)",
        type: "Private",
        location: {
          city: "Bhubaneswar",
          state: "Odisha",
          country: "India",
        },
        established: 1992,
        accreditation: ["NAAC A++", "NBA", "AICTE"],
        ranking: {
          nirf: 39,
          overall: 46,
        },
        programs_offered: [
          programMap["B.Tech Computer Science"],
          programMap["BBA in Marketing"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["KIITEE", "JEE Main"],
          cutoff_details: "KIITEE rank under 10000",
          applicationLink: "https://kiit.ac.in",
        },
        fees: {
          annual_tuition: "₹2,70,000",
          hostel_fees: "₹85,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Medical Center"],
        placement_stats: {
          average_package: "₹6.5 LPA",
          highest_package: "₹39 LPA",
          placement_percentage: "90%",
          top_recruiters: ["Amazon", "Microsoft", "TCS", "Infosys", "Wipro"],
        },
        website: "https://kiit.ac.in",
        contact: {
          email: "info@kiit.ac.in",
          phone: "+91-674-272-5732",
          address: "Bhubaneswar, Odisha 751024",
        },
      },
      {
        name: "Panjab University",
        type: "Public",
        location: {
          city: "Chandigarh",
          state: "Chandigarh",
          country: "India",
        },
        established: 1882,
        accreditation: ["NAAC A++", "UGC"],
        ranking: {
          nirf: 18,
          overall: 22,
        },
        programs_offered: [
          programMap["BA Psychology"],
          programMap["B.Com in Accounting"],
          programMap["BCA (Computer Applications)"],
        ],
        admission_info: {
          application_deadline: "June 2025",
          entrance_exams: ["CUET"],
          cutoff_details: "High cutoffs for popular courses",
          applicationLink: "https://puchd.ac.in",
        },
        fees: {
          annual_tuition: "₹22,000",
          hostel_fees: "₹18,000",
        },
        facilities: ["Library", "Labs", "Sports", "Hostel", "Museum"],
        placement_stats: {
          average_package: "₹5 LPA",
          highest_package: "₹15 LPA",
          placement_percentage: "75%",
          top_recruiters: ["Infosys", "TCS", "Wipro", "ICICI", "HDFC"],
        },
        website: "https://puchd.ac.in",
        contact: {
          email: "info@pu.ac.in",
          phone: "+91-172-253-4500",
          address: "Sector 14, Chandigarh 160014",
        },
      },
    ]);
    console.log(`✓ Added ${batch4.length} colleges (Batch 4)\n`);

    const totalAdded =
      batch1.length + batch2.length + batch3.length + batch4.length;
    console.log(`\n✅ Successfully added ${totalAdded} new colleges!`);
    console.log("\nColleges Summary:");
    console.log(`- Private: ${totalAdded - 9}`);
    console.log(`- Public: 9`);
    console.log("\nYou now have a more diverse college database!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding colleges:", error);
    process.exit(1);
  }
};

add20Colleges();
