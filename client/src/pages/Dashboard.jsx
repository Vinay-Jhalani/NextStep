import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  User,
  Award,
  BookOpen,
  Building2,
  Target,
  ArrowRight,
  Heart,
  Star,
  MapPin,
  X,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [savedColleges, setSavedColleges] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedColleges();
    }
  }, [user]);

  const fetchSavedColleges = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;

      if (!token) {
        setLoadingSaved(false);
        return;
      }

      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSavedColleges(response.data.savedColleges || []);
    } catch (error) {
      console.error("Error fetching saved colleges:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleUnsaveCollege = async (collegeId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;

      await axios.post(
        `${API_URL}/auth/saved-colleges/${collegeId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove from local state
      setSavedColleges((prev) => prev.filter((c) => c._id !== collegeId));
    } catch (error) {
      console.error("Error removing college:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please login to view your dashboard
          </h2>
          <Link to="/login" className="btn-primary inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Here's your personalized dashboard
          </p>
        </div>

        {/* Quiz Status */}
        {!user.quizCompleted ? (
          <div className="card bg-gradient-to-r from-primary-50 to-blue-50 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Career Profile
                </h2>
                <p className="text-gray-700 mb-4">
                  Take our RIASEC quiz to discover your career interests and get
                  personalized recommendations
                </p>
                <Link
                  to="/quiz"
                  className="btn-primary inline-flex items-center"
                >
                  Take Quiz Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <Target className="h-24 w-24 text-primary-600 hidden lg:block" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Career Profile */}
            <div className="card bg-gradient-to-br from-primary-500 to-blue-600 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Your Career Profile
                  </h3>
                  <p className="text-primary-100">Based on RIASEC Assessment</p>
                </div>
                <Award className="h-8 w-8" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-primary-100 text-sm mb-1">
                    Primary Interest
                  </p>
                  <p className="text-2xl font-bold">{user.interests.primary}</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-primary-100 text-sm mb-1">
                    Secondary Interest
                  </p>
                  <p className="text-2xl font-bold">
                    {user.interests.secondary}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-primary-600 mr-3" />
                    <span className="text-gray-700">Saved Programs</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {user.savedPrograms?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Building2 className="h-6 w-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Saved Colleges</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {user.savedColleges?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/programs"
              className="card hover:shadow-xl transition group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition">
                  Browse Programs
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Explore programs that match your interests and career goals
              </p>
              <span className="text-primary-600 font-medium">
                View Programs →
              </span>
            </Link>

            <Link
              to="/colleges"
              className="card hover:shadow-xl transition group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition">
                  Find Colleges
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Compare and discover the best colleges for your chosen field
              </p>
              <span className="text-green-600 font-medium">
                View Colleges →
              </span>
            </Link>

            {user.quizCompleted ? (
              <Link
                to="/quiz"
                className="card hover:shadow-xl transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
                    Retake Quiz
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Update your career profile by retaking the RIASEC assessment
                </p>
                <span className="text-purple-600 font-medium">
                  Retake Quiz →
                </span>
              </Link>
            ) : (
              <Link
                to="/quiz"
                className="card bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
                    Take Career Quiz
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Discover your career interests with our RIASEC assessment
                </p>
                <span className="text-purple-600 font-medium">
                  Start Quiz →
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Saved Colleges Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            Saved Colleges
          </h2>

          {loadingSaved ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading saved colleges...</p>
            </div>
          ) : savedColleges.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                You haven't saved any colleges yet
              </p>
              <Link to="/colleges" className="btn-primary inline-block">
                Browse Colleges
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedColleges.map((college) => (
                <div
                  key={college._id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition group relative"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => handleUnsaveCollege(college._id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
                    title="Remove from saved"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>

                  <Link to={`/colleges/${college._id}`}>
                    {/* College Image */}
                    <div className="relative h-48">
                      <img
                        src={
                          college.photos && college.photos.length > 0
                            ? college.photos[0].url
                            : "https://via.placeholder.com/400x300"
                        }
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                        #{college.ranking?.nirf || "N/A"}
                      </div>
                    </div>

                    {/* College Details */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition line-clamp-2">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {college.location?.city}, {college.location?.state}
                        </span>
                      </div>

                      {college.avgRating && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {college.avgRating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            ({college.totalReviews} reviews)
                          </span>
                        </div>
                      )}

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          college.type === "Public"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {college.type}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center pb-4 border-b border-gray-200">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center pb-4 border-b border-gray-200">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Quiz Status</p>
                <p className="text-gray-900 font-medium">
                  {user.quizCompleted ? (
                    <span className="text-green-600">✓ Completed</span>
                  ) : (
                    <span className="text-yellow-600">⚠ Pending</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
