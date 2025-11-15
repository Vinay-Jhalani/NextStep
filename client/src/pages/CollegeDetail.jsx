import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Building2,
  MapPin,
  Calendar,
  Award,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Heart,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CollegeDetail = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCollegeDetails();
    fetchReviews();
    checkIfSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const checkIfSaved = async () => {
    if (!user) return;
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const savedColleges = response.data.savedColleges || [];
      setIsSaved(savedColleges.some((c) => c._id === id));
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const handleSaveCollege = async () => {
    if (!user) {
      alert("Please login to save colleges");
      return;
    }

    setSaving(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;
      const response = await axios.post(
        `${API_URL}/auth/saved-colleges/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsSaved(response.data.isSaved);

      // Update user context with new saved colleges
      setUser((prevUser) => ({
        ...prevUser,
        savedColleges: response.data.savedColleges,
      }));
    } catch (error) {
      console.error("Error saving college:", error);
      alert(error.response?.data?.message || "Failed to save college");
    } finally {
      setSaving(false);
    }
  };

  const fetchCollegeDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/colleges/${id}`);
      setCollege(response.data);
    } catch (error) {
      console.error("Error fetching college details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews/college/${id}`);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            College not found
          </h2>
          <Link to="/colleges" className="btn-primary inline-block mt-4">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Colleges
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
            to="/colleges"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Colleges
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* College Image */}
            <div className="w-full md:w-1/3">
              <img
                src={
                  college.photos && college.photos.length > 0
                    ? college.photos[0].url
                    : "https://via.placeholder.com/400x300"
                }
                alt={college.name}
                className="w-full h-64 object-cover rounded-lg shadow-xl"
              />
            </div>

            {/* College Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{college.name}</h1>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {college.location?.city}, {college.location?.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Est. {college.established}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <Award className="w-5 h-5" />
                  <span>NIRF #{college.ranking?.nirf || "N/A"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {college.avgRating?.toFixed(1) || "N/A"}
                  </span>
                  <span className="text-white/80 text-sm">
                    ({college.totalReviews || 0} reviews)
                  </span>
                </div>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    college.type === "Public"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {college.type}
                </span>
              </div>

              {college.accreditation?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {college.accreditation.map((acc, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm"
                    >
                      {acc}
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
          {["overview", "programs", "admission", "placement", "reviews"].map(
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
                {tab}
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
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {college.name} is a {college.type.toLowerCase()} institution
                    established in {college.established}. Located in{" "}
                    {college.location?.city}, {college.location?.state}, it
                    offers a wide range of programs across various disciplines.
                  </p>
                </div>

                {college.facilities?.length > 0 && (
                  <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {college.facilities.map((facility, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="text-primary-500">✓</span>
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "programs" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Programs Offered</h2>
                {college.offeredCourses?.length > 0 ? (
                  <div className="space-y-4">
                    {college.offeredCourses.map((courseOffering, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-4 hover:border-primary-500 transition"
                      >
                        <h3 className="font-semibold text-lg mb-2">
                          {courseOffering.course?.name || "Course"}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Min. Marks:</span>
                            <span className="ml-2 font-semibold">
                              {courseOffering.minEligibilityPercent}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Fees:</span>
                            <span className="ml-2 font-semibold">
                              ₹{courseOffering.feesRange?.min?.toLocaleString()}{" "}
                              - ₹
                              {courseOffering.feesRange?.max?.toLocaleString()}
                            </span>
                          </div>
                          {courseOffering.eligibleStreams?.length > 0 && (
                            <div className="col-span-2">
                              <span className="text-gray-600">
                                Eligible Streams:
                              </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {courseOffering.eligibleStreams.map(
                                  (stream, sidx) => (
                                    <span
                                      key={sidx}
                                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                                    >
                                      {stream}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Program information coming soon...
                  </p>
                )}
              </div>
            )}

            {activeTab === "admission" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">
                  Admission Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Application Deadline</h3>
                    <p className="text-gray-600">
                      {college.admission_info?.application_deadline ||
                        "Check official website"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Entrance Exams</h3>
                    <div className="flex flex-wrap gap-2">
                      {college.admission_info?.entrance_exams?.map(
                        (exam, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
                          >
                            {exam}
                          </span>
                        )
                      ) || <p className="text-gray-600">Not specified</p>}
                    </div>
                  </div>
                  {college.admission_info?.applicationLink && (
                    <a
                      href={college.admission_info.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeTab === "placement" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">
                  Placement Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {college.placement_stats?.placement_percentage || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Placement Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {college.placement_stats?.average_package || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Package</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {college.placement_stats?.highest_package || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Highest Package</div>
                  </div>
                </div>
                {college.placement_stats?.top_recruiters?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {college.placement_stats.top_recruiters.map(
                        (recruiter, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded"
                          >
                            {recruiter}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {review.rating}/5
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg">
                            {review.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            by {review.user?.name} • {review.course}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{review.review}</p>
                      {review.pros?.length > 0 && (
                        <div className="mb-2">
                          <span className="font-semibold text-green-600">
                            Pros:
                          </span>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons?.length > 0 && (
                        <div>
                          <span className="font-semibold text-red-600">
                            Cons:
                          </span>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="card text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No reviews yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Annual Tuition:</span>
                  <div className="font-semibold">
                    {college.fees?.annual_tuition || "N/A"}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Hostel Fees:</span>
                  <div className="font-semibold">
                    {college.fees?.hostel_fees || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
              <div className="space-y-3">
                {college.contact?.email && (
                  <a
                    href={`mailto:${college.contact.email}`}
                    className="flex items-center gap-2 text-primary-600 hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {college.contact.email}
                  </a>
                )}
                {college.contact?.phone && (
                  <a
                    href={`tel:${college.contact.phone}`}
                    className="flex items-center gap-2 text-primary-600 hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {college.contact.phone}
                  </a>
                )}
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-600 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Official Website
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            {user && (
              <div className="card">
                <button
                  onClick={handleSaveCollege}
                  disabled={saving}
                  className={`w-full flex items-center justify-center gap-2 mb-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    isSaved
                      ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      isSaved ? "fill-white animate-pulse" : ""
                    }`}
                  />
                  <span className="text-base">
                    {saving
                      ? "Saving..."
                      : isSaved
                      ? "Saved to Favorites ✓"
                      : "Save to Favorites"}
                  </span>
                </button>
                <Link
                  to={`/compare?colleges=${id}`}
                  className="btn-secondary w-full flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Building2 className="w-4 h-4" />
                  Compare
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
