import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  User,
  BookOpen,
  DollarSign,
  MapPin,
  GraduationCap,
  Save,
} from "lucide-react";
import axios from "axios";
import StreamSelectionModal from "../components/StreamSelectionModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showStreamModal, setShowStreamModal] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    education: {
      stream: user?.education?.stream || "",
      subjects: user?.education?.subjects || [],
      percentage: user?.education?.percentage || "",
      passingYear: user?.education?.passingYear || "",
      board: user?.education?.board || "",
    },
    examScores: user?.examScores || [],
    preferences: {
      preferredStreams: user?.preferences?.preferredStreams || [],
      budget: {
        min: user?.preferences?.budget?.min || 0,
        max: user?.preferences?.budget?.max || 1000000,
      },
      location: {
        preferredStates: user?.preferences?.location?.preferredStates || [],
        preferredCities: user?.preferences?.location?.preferredCities || [],
      },
      collegeType: user?.preferences?.collegeType || [],
    },
  });

  // Check if stream is not selected and show modal
  useEffect(() => {
    if (user && !user.education?.stream) {
      setShowStreamModal(true);
    }
  }, [user]);

  const streamOptions = [
    "Science (PCM)",
    "Science (PCB)",
    "Science (PCMB)",
    "Commerce (with Maths)",
    "Commerce (without Maths)",
    "Arts (Humanities)",
    "Vocational",
    "Other",
  ];
  const preferredStreamOptions = [
    "Engineering",
    "Medical",
    "Commerce",
    "Arts",
    "Science",
    "Management",
    "Law",
    "Design",
  ];
  const collegeTypeOptions = ["Government", "Private", "Deemed", "Autonomous"];
  const boardOptions = ["CBSE", "ICSE", "State Board", "IB", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("education.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        education: { ...formData.education, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreferredStreamToggle = (stream) => {
    const streams = formData.preferences.preferredStreams.includes(stream)
      ? formData.preferences.preferredStreams.filter((s) => s !== stream)
      : [...formData.preferences.preferredStreams, stream];
    setFormData({
      ...formData,
      preferences: { ...formData.preferences, preferredStreams: streams },
    });
  };

  const handleCollegeTypeToggle = (type) => {
    const types = formData.preferences.collegeType.includes(type)
      ? formData.preferences.collegeType.filter((t) => t !== type)
      : [...formData.preferences.collegeType, type];
    setFormData({
      ...formData,
      preferences: { ...formData.preferences, collegeType: types },
    });
  };

  const handleBudgetChange = (field, value) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        budget: {
          ...formData.preferences.budget,
          [field]: parseInt(value) || 0,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;

      if (!token) {
        setMessage({ type: "error", text: "Please login again" });
        setLoading(false);
        return;
      }

      const response = await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });
      if (updateUser) {
        updateUser(response.data.user);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalComplete = (updatedUser) => {
    if (updateUser) {
      updateUser(updatedUser);
    }
    setShowStreamModal(false);
    setMessage({
      type: "success",
      text: "Education details saved successfully!",
    });

    // Update form data
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        stream: updatedUser.education.stream,
        board: updatedUser.education.board,
        passingYear: updatedUser.education.passingYear,
      },
    });
  };

  return (
    <>
      {/* Stream Selection Modal */}
      {showStreamModal && (
        <StreamSelectionModal user={user} onComplete={handleModalComplete} />
      )}

      {/* Main Profile Form */}
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Profile
            </h1>
            <p className="text-xl text-gray-600">
              Complete your profile to get personalized recommendations
            </p>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="w-6 h-6" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="input-field bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Education Details */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Education Details (Class 12th)
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stream
                    </label>
                    <select
                      name="education.stream"
                      value={formData.education.stream}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select Stream</option>
                      {streamOptions.map((stream) => (
                        <option key={stream} value={stream}>
                          {stream}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Board
                    </label>
                    <select
                      name="education.board"
                      value={formData.education.board}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Board</option>
                      {boardOptions.map((board) => (
                        <option key={board} value={board}>
                          {board}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Percentage / CGPA
                    </label>
                    <input
                      type="number"
                      name="education.percentage"
                      value={formData.education.percentage}
                      onChange={handleChange}
                      className="input-field"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="85.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Passing Year
                    </label>
                    <input
                      type="number"
                      name="education.passingYear"
                      value={formData.education.passingYear}
                      onChange={handleChange}
                      className="input-field"
                      min="2000"
                      max="2030"
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Course Preferences
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Streams (Select multiple)
                </label>
                <div className="flex flex-wrap gap-2">
                  {preferredStreamOptions.map((stream) => (
                    <button
                      key={stream}
                      type="button"
                      onClick={() => handlePreferredStreamToggle(stream)}
                      className={`px-4 py-2 rounded-lg border transition ${
                        formData.preferences.preferredStreams.includes(stream)
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary-500"
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Budget (Annual Fees)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Minimum (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.preferences.budget.min}
                    onChange={(e) => handleBudgetChange("min", e.target.value)}
                    className="input-field"
                    min="0"
                    step="10000"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Maximum (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.preferences.budget.max}
                    onChange={(e) => handleBudgetChange("max", e.target.value)}
                    className="input-field"
                    min="0"
                    step="10000"
                    placeholder="500000"
                  />
                </div>
              </div>
            </div>

            {/* College Type */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                College Preferences
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred College Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {collegeTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleCollegeTypeToggle(type)}
                      className={`px-4 py-2 rounded-lg border transition ${
                        formData.preferences.collegeType.includes(type)
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
