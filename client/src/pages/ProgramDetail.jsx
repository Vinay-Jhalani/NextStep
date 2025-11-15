import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Building2,
  ArrowLeft,
  CheckCircle,
  Filter,
  MapPin,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProgramDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchProgramDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/programs/${id}`);
      setProgram(response.data);
    } catch (error) {
      console.error("Error fetching program details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Program not found
          </h2>
          <Link to="/programs" className="btn-primary inline-block mt-4">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Program Icon */}
            <div className="w-full md:w-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Program Info */}
            <div className="flex-1">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                {program.degree_type}
              </span>
              <h1 className="text-4xl font-bold mb-4">
                {program.program_name}
              </h1>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{program.average_salary || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>
                    {program.college_ids?.length || 0} colleges offering
                  </span>
                </div>
              </div>

              {/* Interest Tags */}
              {program.interest_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {program.interest_tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {["overview", "eligibility", "career-paths", "colleges"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-primary-500 text-primary-600"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">
                    About This Program
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {program.skills_required?.length > 0 && (
                  <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Skills Required</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.skills_required.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-6 h-6 text-primary-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Degree Type
                        </h3>
                        <p className="text-gray-600">{program.degree_type}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-primary-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Duration
                        </h3>
                        <p className="text-gray-600">{program.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 text-primary-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Average Salary
                        </h3>
                        <p className="text-gray-600">
                          {program.average_salary || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="w-6 h-6 text-primary-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Colleges Offering
                        </h3>
                        <p className="text-gray-600">
                          {program.college_ids?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "eligibility" && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">
                    Eligibility Criteria
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {program.eligibility ||
                      "Eligibility information will be updated soon."}
                  </p>

                  {program.eligible_streams?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Eligible Streams
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {program.eligible_streams.map((stream, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
                          >
                            {stream}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Minimum Percentage
                    </h3>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">
                        {program.min_percentage}% or equivalent
                      </span>
                    </div>
                  </div>
                </div>

                {user?.education?.stream && (
                  <div className="card">
                    <h3 className="text-xl font-bold mb-3">Your Eligibility</h3>
                    {program.eligible_streams?.includes(
                      user.education.stream
                    ) || program.eligible_streams?.includes("Any") ? (
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900">
                            You are eligible for this program!
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Your stream ({user.education.stream}) matches the
                            eligibility criteria.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                        <Filter className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-yellow-900">
                            This program may not match your stream
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Your current stream is {user.education.stream}.
                            Please check the eligible streams above.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "career-paths" && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">
                    Career Opportunities
                  </h2>
                  {program.career_paths?.length > 0 ? (
                    <div className="space-y-3">
                      {program.career_paths.map((career, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                        >
                          <Briefcase className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{career}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      Career path information will be updated soon.
                    </p>
                  )}
                </div>

                <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-8 h-8 text-primary-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Average Starting Salary
                      </h3>
                      <p className="text-2xl font-bold text-primary-600">
                        {program.average_salary || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "colleges" && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-4">
                    Colleges Offering This Program
                  </h2>
                  {program.college_ids?.length > 0 ? (
                    <div className="space-y-4">
                      {program.college_ids.map((college) => (
                        <Link
                          key={college._id}
                          to={`/colleges/${college._id}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-primary-300 transition"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={
                                college.image_url ||
                                "https://via.placeholder.com/100"
                              }
                              alt={college.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 mb-1">
                                {college.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>
                                  {college.location?.city},{" "}
                                  {college.location?.state}
                                </span>
                              </div>
                              {college.ranking?.nirf && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
                                  <Award className="w-3 h-3" />
                                  NIRF #{college.ranking.nirf}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No colleges found for this program.
                    </p>
                  )}
                </div>

                <div className="card bg-blue-50">
                  <p className="text-gray-700">
                    Want to explore more colleges? Visit our{" "}
                    <Link
                      to="/colleges"
                      className="text-primary-600 font-semibold hover:underline"
                    >
                      Colleges page
                    </Link>{" "}
                    to find the perfect match for you.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Link
                  to={`/colleges?program=${id}`}
                  className="block w-full btn-primary text-center"
                >
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Explore Colleges
                </Link>

                {!user?.quizCompleted && (
                  <Link
                    to="/quiz"
                    className="block w-full btn-secondary text-center"
                  >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Take Career Quiz
                  </Link>
                )}

                <Link
                  to="/programs"
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  View All Programs
                </Link>
              </div>

              {user?.interests?.primary && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Based on Your Interests
                  </h4>
                  <p className="text-sm text-gray-600">
                    This program matches your interest profile:{" "}
                    <span className="font-medium">
                      {user.interests.primary}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
