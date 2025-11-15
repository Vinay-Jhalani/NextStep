import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import {
  Building2,
  Search,
  MapPin,
  Award,
  TrendingUp,
  ExternalLink,
  BookOpen,
  X,
  Star,
  GitCompare,
} from "lucide-react";

const Colleges = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [programFilter, setProgramFilter] = useState(null);
  const [programName, setProgramName] = useState("");
  const [programCollegeIds, setProgramCollegeIds] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  useEffect(() => {
    fetchColleges();

    // Check for program filter in URL params
    const programId = searchParams.get("program");
    if (programId) {
      fetchProgramDetails(programId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    filterColleges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colleges, searchTerm, typeFilter, stateFilter, sortBy, programFilter]);

  const fetchColleges = async () => {
    try {
      const { data } = await api.get("/colleges");
      setColleges(data);
      setFilteredColleges(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      setLoading(false);
    }
  };

  const fetchProgramDetails = async (programId) => {
    try {
      const { data } = await api.get(`/programs/${programId}`);
      setProgramFilter(programId);
      setProgramName(data.program_name);
      // Extract college IDs from the program's college_ids array
      const collegeIds =
        data.college_ids?.map((college) =>
          typeof college === "string" ? college : college._id
        ) || [];
      setProgramCollegeIds(collegeIds);
    } catch (error) {
      console.error("Error fetching program details:", error);
    }
  };

  const clearProgramFilter = () => {
    setProgramFilter(null);
    setProgramName("");
    setProgramCollegeIds([]);
    setSearchParams({});
  };

  const toggleCompareSelection = (college) => {
    setSelectedForCompare((prev) => {
      const isSelected = prev.find((c) => c._id === college._id);
      if (isSelected) {
        return prev.filter((c) => c._id !== college._id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 colleges at a time");
          return prev;
        }
        return [...prev, college];
      }
    });
  };

  const removeFromCompare = (collegeId) => {
    setSelectedForCompare((prev) => prev.filter((c) => c._id !== collegeId));
  };

  const clearAllCompare = () => {
    setSelectedForCompare([]);
  };

  const goToCompare = () => {
    const ids = selectedForCompare.map((c) => c._id).join(",");
    navigate(`/compare?colleges=${ids}`);
  };

  const filterColleges = () => {
    let filtered = [...colleges];

    // Program filter - show only colleges offering this program
    if (programFilter && programCollegeIds.length > 0) {
      filtered = filtered.filter((college) =>
        programCollegeIds.includes(college._id)
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.city
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          college.location.state
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Type filter (Public/Private)
    if (typeFilter) {
      filtered = filtered.filter((college) => college.type === typeFilter);
    }

    // State filter
    if (stateFilter) {
      filtered = filtered.filter(
        (college) => college.location.state === stateFilter
      );
    }

    // Sort
    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "ranking") {
      filtered.sort(
        (a, b) => (a.ranking?.nirf || 999) - (b.ranking?.nirf || 999)
      );
    }

    setFilteredColleges(filtered);
  };

  const uniqueStates = [
    ...new Set(colleges.map((c) => c.location.state).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              College Directory
            </h1>
            <p className="text-xl text-gray-600">
              Browse and compare colleges from across India - both public and
              private institutions
            </p>
          </div>

          {/* Filters */}
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              {/* State Filter */}
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                  <option value="">All States</option>
                  {uniqueStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredColleges.length}</span>{" "}
                colleges
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="ranking">Ranking</option>
                </select>
              </div>
            </div>

            {/* Program Filter Active Message */}
            {programFilter && programName && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-center justify-between">
                <p className="text-primary-700 text-sm">
                  <BookOpen className="inline h-4 w-4 mr-1" />
                  Showing colleges offering: <strong>{programName}</strong>
                </p>
                <button
                  onClick={clearProgramFilter}
                  className="text-primary-600 hover:text-primary-800 p-1"
                  title="Clear program filter"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Colleges List */}
          {filteredColleges.length === 0 ? (
            <div className="card text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No colleges found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredColleges.map((college) => (
                <div
                  key={college._id}
                  className="card hover:shadow-xl transition"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* College Photo */}
                    {college.photos && college.photos.length > 0 && (
                      <div className="lg:w-64 flex-shrink-0 relative">
                        <img
                          src={college.photos[0].url}
                          alt={college.name}
                          className="w-full h-48 lg:h-full object-cover rounded-lg"
                        />
                        {/* Compare Checkbox */}
                        <div className="absolute top-2 right-2">
                          <label className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={selectedForCompare.some(
                                (c) => c._id === college._id
                              )}
                              onChange={() => toggleCompareSelection(college)}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Compare
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">
                              {college.name}
                            </h2>
                            {college.ranking?.nirf && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                                NIRF #{college.ranking.nirf}
                              </span>
                            )}
                          </div>

                          {/* Rating */}
                          {college.avgRating && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 font-semibold text-gray-900">
                                  {college.avgRating.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">
                                ({college.totalReviews} reviews)
                              </span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 items-center text-gray-600">
                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                              {college.type}
                            </span>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              {college.location.city}, {college.location.state}
                            </div>
                            {college.established && (
                              <span className="text-sm">
                                Est. {college.established}
                              </span>
                            )}
                          </div>
                        </div>
                        <Building2 className="h-8 w-8 text-primary-600 flex-shrink-0" />
                      </div>

                      {/* Accreditation */}
                      {college.accreditation &&
                        college.accreditation.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {college.accreditation.map((acc, index) => (
                              <span
                                key={index}
                                className="flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"
                              >
                                <Award className="h-3 w-3 mr-1" />
                                {acc}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Programs Offered */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">
                          Programs Offered:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {college.programs_offered
                            ?.slice(0, 5)
                            .map((program) => (
                              <span
                                key={program._id}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {program.program_name}
                              </span>
                            ))}
                          {college.programs_offered?.length > 5 && (
                            <span className="px-2 py-1 text-primary-600 text-xs font-medium">
                              +{college.programs_offered.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Stats */}
                    <div className="lg:w-80 space-y-4">
                      {/* Fees */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">
                          Fees
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Annual Tuition:
                            </span>
                            <span className="font-medium">
                              {college.fees?.annual_tuition || "N/A"}
                            </span>
                          </div>
                          {college.fees?.hostel_fees && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hostel:</span>
                              <span className="font-medium">
                                {college.fees.hostel_fees}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Placements */}
                      {college.placement_stats && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Placement Stats
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Average Package:
                              </span>
                              <span className="font-medium">
                                {college.placement_stats.average_package}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Highest Package:
                              </span>
                              <span className="font-medium">
                                {college.placement_stats.highest_package}
                              </span>
                            </div>
                            {college.placement_stats.placement_percentage && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Placement Rate:
                                </span>
                                <span className="font-medium">
                                  {college.placement_stats.placement_percentage}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {college.website && (
                          <a
                            href={college.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-secondary text-center flex items-center justify-center text-sm"
                          >
                            Visit Website
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        )}
                        <Link
                          to={`/colleges/${college._id}`}
                          className="flex-1 btn-primary text-center text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Compare Bar */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-gray-900">
                    Compare Colleges ({selectedForCompare.length}/4)
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto max-w-2xl">
                  {selectedForCompare.map((college) => (
                    <div
                      key={college._id}
                      className="flex items-center gap-2 bg-primary-50 px-3 py-1 rounded-full whitespace-nowrap"
                    >
                      <span className="text-sm text-primary-900">
                        {college.name.length > 30
                          ? college.name.substring(0, 30) + "..."
                          : college.name}
                      </span>
                      <button
                        onClick={() => removeFromCompare(college._id)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearAllCompare}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={goToCompare}
                  disabled={selectedForCompare.length < 2}
                  className={`btn-primary flex items-center gap-2 ${
                    selectedForCompare.length < 2
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <GitCompare className="w-4 h-4" />
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Colleges;
