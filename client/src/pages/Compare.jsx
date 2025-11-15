import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Scale, MapPin, DollarSign, Star, Award, X } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collegeIds = searchParams.get("colleges")?.split(",") || [];
    if (collegeIds.length > 0) {
      fetchColleges(collegeIds);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchColleges = async (ids) => {
    try {
      setLoading(true);
      const requests = ids.map((id) => axios.get(`${API_URL}/colleges/${id}`));
      const responses = await Promise.all(requests);
      setColleges(responses.map((r) => r.data));
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeCollege = (index) => {
    const newColleges = colleges.filter((_, i) => i !== index);
    setColleges(newColleges);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center py-12">
            <Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No colleges selected
            </h2>
            <p className="text-gray-600 mb-6">
              Go to the colleges page and select colleges to compare
            </p>
            <a href="/colleges" className="btn-primary inline-block">
              Browse Colleges
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Scale className="w-10 h-10 text-primary-500" />
            Compare Colleges
          </h1>
          <p className="text-xl text-gray-600">
            Side-by-side comparison of {colleges.length} college
            {colleges.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left bg-gray-50 font-semibold text-gray-700 sticky left-0">
                  Feature
                </th>
                {colleges.map((college, index) => (
                  <th
                    key={college._id}
                    className="px-6 py-4 text-center bg-gray-50 min-w-[250px]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-gray-900 text-sm">
                          {college.name}
                        </span>
                        <button
                          onClick={() => removeCollege(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {college.photos && college.photos.length > 0 && (
                        <img
                          src={college.photos[0].url}
                          alt={college.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Type */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Type
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        college.type === "Public"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {college.type}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.location?.city}, {college.location?.state}
                  </td>
                ))}
              </tr>

              {/* Established */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Established
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.established || "N/A"}
                  </td>
                ))}
              </tr>

              {/* NIRF Ranking */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    NIRF Ranking
                  </div>
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    <span className="text-lg font-semibold text-primary-600">
                      #{college.ranking?.nirf || "N/A"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Average Rating
                  </div>
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {college.avgRating?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({college.totalReviews || 0})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Annual Tuition */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Annual Tuition
                  </div>
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.fees?.annual_tuition || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Hostel Fees */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Hostel Fees
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.fees?.hostel_fees || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Average Package */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Avg. Package
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.placement_stats?.average_package || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Highest Package */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Highest Package
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.placement_stats?.highest_package || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Placement Percentage */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Placement Rate
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    <span className="text-lg font-semibold text-green-600">
                      {college.placement_stats?.placement_percentage || "N/A"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Accreditation */}
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Accreditation
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {college.accreditation?.length > 0
                        ? college.accreditation.map((acc, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                            >
                              {acc}
                            </span>
                          ))
                        : "N/A"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Website */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Website
                </td>
                {colleges.map((college) => (
                  <td key={college._id} className="px-6 py-4 text-center">
                    {college.website ? (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="/colleges" className="btn-secondary">
            Add More Colleges
          </a>
        </div>
      </div>
    </div>
  );
};

export default Compare;
