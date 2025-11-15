/**
 * Recommendation Engine for NextStep
 * Rule-based scoring system to match students with colleges and courses
 * Score range: 0-100
 */

import College from "../models/College.js";
import Course from "../models/Course.js";
import Exam from "../models/Exam.js";

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {Number} lat1 - Latitude of point 1
 * @param {Number} lon1 - Longitude of point 1
 * @param {Number} lat2 - Latitude of point 2
 * @param {Number} lon2 - Longitude of point 2
 * @returns {Number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Score a college course offering for a student
 * @param {Object} student - Student profile with education, preferences, exam scores
 * @param {Object} courseOffering - College course offering with eligibility criteria
 * @param {Object} college - College information
 * @returns {Object} Scoring result with total score and reasons
 */
export function scoreCollegeForStudent(student, courseOffering, college) {
  const reasons = [];
  let totalScore = 0;

  // 1. MANDATORY: Stream/Subject Match (Filter out if not matched)
  const course = courseOffering.course;
  const requiredSubjects =
    courseOffering.requiredSubjects || course.requiredSubjects || [];
  const studentSubjects = student.education?.subjects || [];

  if (requiredSubjects.length > 0) {
    const hasAllSubjects = requiredSubjects.every((subject) =>
      studentSubjects.some((s) => s.toLowerCase() === subject.toLowerCase())
    );

    if (!hasAllSubjects) {
      return {
        score: -1,
        reasons: [
          `Missing required subjects: ${requiredSubjects
            .filter((sub) => !studentSubjects.includes(sub))
            .join(", ")}`,
        ],
        eligible: false,
      };
    }
    reasons.push(`✓ Subjects match: ${requiredSubjects.join(", ")}`);
  }

  // Check stream eligibility
  if (course.eligibleStreams && course.eligibleStreams.length > 0) {
    const studentStream = student.education?.stream;
    if (
      studentStream &&
      !course.eligibleStreams.includes(studentStream) &&
      !course.eligibleStreams.includes("Any")
    ) {
      return {
        score: -1,
        reasons: [
          `Stream not eligible. Required: ${course.eligibleStreams.join(
            " or "
          )}`,
        ],
        eligible: false,
      };
    }
    reasons.push(`✓ Stream eligible: ${studentStream}`);
  }

  // 2. MARKS FIT (30 points max)
  const studentPercent = student.education?.percentage || 0;
  const minEligibility =
    courseOffering.minEligibilityPercent || course.minEligibilityPercent || 50;

  if (studentPercent >= minEligibility) {
    const marksScore = Math.min(
      30,
      20 + (studentPercent - minEligibility) * 0.5
    );
    totalScore += marksScore;
    reasons.push(
      `✓ Marks fit: ${studentPercent}% (min: ${minEligibility}%) [+${marksScore.toFixed(
        1
      )}]`
    );
  } else {
    const penalty = Math.max(0, 30 - (minEligibility - studentPercent) * 2);
    totalScore += penalty;
    reasons.push(
      `⚠ Below min marks: ${studentPercent}% < ${minEligibility}% [+${penalty.toFixed(
        1
      )}]`
    );
  }

  // 3. ENTRANCE EXAM FIT (25 points max)
  const acceptedExams = courseOffering.acceptedExams || [];
  const studentExams = student.examScores || [];

  if (acceptedExams.length > 0) {
    const matchedExam = studentExams.find((studentExam) =>
      acceptedExams.some((exam) => exam.toString() === studentExam.examName)
    );

    if (matchedExam) {
      totalScore += 25;
      reasons.push(
        `✓ Exam qualified: ${matchedExam.examName} (Score: ${matchedExam.score}) [+25]`
      );
    } else {
      totalScore += 5;
      reasons.push(
        `⚠ Exam not attempted yet. Required: ${acceptedExams.length} exam(s) [+5]`
      );
    }
  } else {
    totalScore += 10;
    reasons.push(`✓ No entrance exam required [+10]`);
  }

  // 4. COURSE PREFERENCE MATCH (15 points max)
  const preferredStreams = student.preferences?.preferredStreams || [];
  if (preferredStreams.length > 0) {
    if (preferredStreams.includes(course.category)) {
      totalScore += 15;
      reasons.push(`✓ Matches your preferred stream: ${course.category} [+15]`);
    } else {
      reasons.push(`○ Not your preferred stream [+0]`);
    }
  } else {
    totalScore += 5;
    reasons.push(`○ No stream preference set [+5]`);
  }

  // 5. LOCATION PREFERENCE (10 points max)
  const locationPrefs = student.preferences?.location || {};
  const preferredStates = locationPrefs.preferredStates || [];
  const preferredCities = locationPrefs.preferredCities || [];

  if (preferredStates.length > 0 || preferredCities.length > 0) {
    if (
      preferredStates.includes(college.location?.state) ||
      preferredCities.includes(college.location?.city)
    ) {
      totalScore += 10;
      reasons.push(
        `✓ Located in your preferred area: ${college.location?.city} [+10]`
      );
    } else {
      reasons.push(`○ Not in preferred location [+0]`);
    }
  } else {
    totalScore += 5;
    reasons.push(`○ No location preference set [+5]`);
  }

  // 6. BUDGET MATCH (10 points max)
  const studentBudget = student.preferences?.budget || {};
  const feesMin = courseOffering.feesRange?.min || 0;
  const feesMax = courseOffering.feesRange?.max || feesMin;

  if (studentBudget.max) {
    if (feesMin <= studentBudget.max) {
      const budgetScore = feesMin <= studentBudget.min ? 10 : 7;
      totalScore += budgetScore;
      reasons.push(
        `✓ Fees within budget: ₹${feesMin.toLocaleString()}-${feesMax.toLocaleString()} [+${budgetScore}]`
      );
    } else {
      reasons.push(
        `⚠ Fees exceed budget: ₹${feesMin.toLocaleString()} > ₹${studentBudget.max.toLocaleString()} [+0]`
      );
    }
  } else {
    totalScore += 5;
    reasons.push(`○ No budget preference set [+5]`);
  }

  // 7. COLLEGE RATING (10 points max)
  const rating = college.avgRating || 3;
  const ratingScore = Math.min(10, rating * 2);
  totalScore += ratingScore;
  reasons.push(
    `✓ College rating: ${rating.toFixed(1)}/5 [+${ratingScore.toFixed(1)}]`
  );

  return {
    score: Math.round(totalScore),
    reasons,
    eligible: true,
    collegeId: college._id,
    collegeName: college.name,
    courseId: course._id,
    courseName: course.name,
    location: college.location,
    fees: courseOffering.feesRange,
    applicationLink: college.admission_info?.applicationLink || college.website,
    requiredExams: acceptedExams,
  };
}

/**
 * Generate personalized recommendations for a student
 * @param {Object} student - Student profile
 * @param {Number} limit - Maximum number of recommendations (default: 10)
 * @returns {Array} Sorted array of recommendations
 */
export async function generateRecommendations(student, limit = 10) {
  try {
    // Fetch all colleges with their offered courses
    const colleges = await College.find({
      offeredCourses: { $exists: true, $ne: [] },
    })
      .populate({
        path: "offeredCourses.course",
        model: "Course",
      })
      .populate({
        path: "offeredCourses.acceptedExams",
        model: "Exam",
      })
      .lean();

    const recommendations = [];

    // Score each college-course combination
    for (const college of colleges) {
      for (const courseOffering of college.offeredCourses || []) {
        const result = scoreCollegeForStudent(student, courseOffering, college);

        // Only include eligible recommendations
        if (result.eligible && result.score > 0) {
          recommendations.push(result);
        }
      }
    }

    // Sort by score (descending) and return top N
    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, limit);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}

/**
 * Get recommendations based on RIASEC interests (existing system)
 * @param {Object} interests - Primary and secondary RIASEC interests
 * @returns {Object} Recommended programs and colleges
 */
export async function getRecommendationsByInterests(interests) {
  try {
    const { primary, secondary } = interests;

    // This integrates with your existing RIASEC-based system
    // You can combine both approaches for better recommendations
    const colleges = await College.find()
      .populate("programs_offered")
      .limit(10)
      .lean();

    return {
      message: "RIASEC-based recommendations",
      primary,
      secondary,
      colleges,
    };
  } catch (error) {
    console.error("Error in RIASEC recommendations:", error);
    throw error;
  }
}

export default {
  scoreCollegeForStudent,
  generateRecommendations,
  getRecommendationsByInterests,
  calculateDistance,
};
