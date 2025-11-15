import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import StreamSelectionModal from "../components/StreamSelectionModal";
import { BookOpen, Search, Filter, MapPin, TrendingUp } from "lucide-react";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");
  const [streamFilter, setStreamFilter] = useState("");
  const [showRecommended, setShowRecommended] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    fetchPrograms();
    // Auto-apply user's stream filter if available
    if (user?.education?.stream) {
      setStreamFilter(user.education.stream);
    } else if (user) {
      // Show modal if logged in but no stream selected
      setShowStreamModal(true);
    }
  }, [user]);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchTerm, degreeFilter, streamFilter, showRecommended]);

  const fetchPrograms = async () => {
    try {
      const { data } = await api.get("/programs");
      setPrograms(data);
      setFilteredPrograms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = [...programs];

    // Show recommended programs based on user interests
    if (showRecommended && user?.interests?.primary) {
      filtered = filtered.filter(
        (program) =>
          program.interest_tags.includes(user.interests.primary) ||
          program.interest_tags.includes(user.interests.secondary)
      );
    }

    // Stream filter - filter by eligible_streams
    if (streamFilter) {
      filtered = filtered.filter(
        (program) =>
          program.eligible_streams?.includes(streamFilter) ||
          program.eligible_streams?.includes("Any")
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (program) =>
          program.program_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          program.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Degree type filter
    if (degreeFilter) {
      filtered = filtered.filter(
        (program) => program.degree_type === degreeFilter
      );
    }

    setFilteredPrograms(filtered);
  };

  const degreeTypes = [
    "B.Tech",
    "B.Sc",
    "B.Com",
    "BBA",
    "BA",
    "B.Arch",
    "BCA",
    "Other",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  const handleModalComplete = (updatedUser) => {
    if (updateUser) {
      updateUser(updatedUser);
    }
    setShowStreamModal(false);
    setStreamFilter(updatedUser.education.stream);
  };

  return (
    <>
      {/* Stream Selection Modal */}
      {showStreamModal && (
        <StreamSelectionModal user={user} onComplete={handleModalComplete} />
      )}

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Programs
            </h1>
            <p className="text-xl text-gray-600">
              Discover the perfect program that matches your interests and
              career goals
            </p>
          </div>

          {/* Filters */}
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Stream Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  value={streamFilter}
                  onChange={(e) => setStreamFilter(e.target.value)}
                >
                  <option value="">All Streams</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Science (PCB)">Science (PCB)</option>
                  <option value="Science (PCMB)">Science (PCMB)</option>
                  <option value="Commerce (with Maths)">
                    Commerce (with Maths)
                  </option>
                  <option value="Commerce (without Maths)">
                    Commerce (without Maths)
                  </option>
                  <option value="Arts (Humanities)">Arts (Humanities)</option>
                  <option value="Vocational">Vocational</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Degree Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  value={degreeFilter}
                  onChange={(e) => setDegreeFilter(e.target.value)}
                >
                  <option value="">All Degree Types</option>
                  {degreeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recommended Toggle */}
              {user?.quizCompleted && (
                <div className="flex items-center justify-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 h-5 w-5"
                      checked={showRecommended}
                      onChange={(e) => setShowRecommended(e.target.checked)}
                    />
                    <span className="font-medium text-gray-700">
                      Show Recommended for Me
                    </span>
                  </label>
                </div>
              )}
            </div>

            {user?.interests?.primary && showRecommended && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                <p className="text-primary-700 text-sm">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Showing programs matching your interests:{" "}
                  <strong>{user.interests.primary}</strong> &{" "}
                  <strong>{user.interests.secondary}</strong>
                </p>
              </div>
            )}

            {streamFilter && user?.education?.stream && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-700 text-sm">
                  <Filter className="inline h-4 w-4 mr-1" />
                  Showing programs eligible for your stream:{" "}
                  <strong>{streamFilter}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredPrograms.length}</span>{" "}
            programs
          </div>

          {/* Programs Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="card text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No programs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program._id}
                  className="card hover:shadow-xl transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-2">
                        {program.degree_type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition">
                        {program.program_name}
                      </h3>
                    </div>
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Duration:</span>{" "}
                      {program.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Avg. Salary:</span>{" "}
                      {program.average_salary}
                    </div>
                  </div>

                  {/* Interest Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.interest_tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Colleges Count */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {program.college_ids?.length || 0} colleges offering
                      </span>
                    </div>
                    <Link
                      to={`/programs/${program._id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          {!user?.quizCompleted && (
            <div className="mt-12 card bg-gradient-to-r from-primary-50 to-blue-50 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not sure which program is right for you?
              </h3>
              <p className="text-gray-700 mb-6">
                Take our career quiz to get personalized program recommendations
              </p>
              <Link to="/quiz" className="btn-primary inline-block">
                Take Career Quiz
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Programs;
