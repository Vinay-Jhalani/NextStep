import { useState, useEffect } from "react";
import { Bell, Calendar, ExternalLink, Filter } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: "", stream: "" });

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.type) params.append("type", filter.type);
      if (filter.stream) params.append("stream", filter.stream);

      const response = await axios.get(
        `${API_URL}/alerts?${params.toString()}`
      );
      setAlerts(response.data.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      Admission: "🎓",
      Exam: "📝",
      Scholarship: "💰",
      Deadline: "⏰",
      Result: "📊",
      General: "ℹ️",
    };
    return icons[type] || "📢";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Bell className="w-10 h-10 text-primary-500" />
            Admission Alerts
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest admission notifications and deadlines
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="input-field max-w-xs"
            >
              <option value="">All Types</option>
              <option value="Admission">Admission</option>
              <option value="Exam">Exam</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Deadline">Deadline</option>
              <option value="Result">Result</option>
            </select>

            <select
              value={filter.stream}
              onChange={(e) => setFilter({ ...filter, stream: e.target.value })}
              className="input-field max-w-xs"
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
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading alerts...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No alerts found
            </h3>
            <p className="text-gray-600">
              Check back later for new admission notifications
            </p>
          </div>
        ) : (
          /* Alerts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className="card hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                        alert.priority
                      )}`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {alert.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {alert.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {alert.description}
                </p>

                {/* College Info */}
                {alert.college && (
                  <div className="mb-3 text-sm">
                    <span className="font-semibold text-gray-700">
                      {alert.college.name}
                    </span>
                    {alert.college.location && (
                      <span className="text-gray-500">
                        {" • "}
                        {alert.college.location.city}
                      </span>
                    )}
                  </div>
                )}

                {/* Dates */}
                {alert.startDate && alert.endDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(alert.startDate)} -{" "}
                      {formatDate(alert.endDate)}
                    </span>
                  </div>
                )}

                {/* Actions */}
                {(alert.registrationLink || alert.externalUrl) && (
                  <a
                    href={alert.registrationLink || alert.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
