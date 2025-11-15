import { useState } from "react";
import { GraduationCap, Save } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const StreamSelectionModal = ({ user, onComplete }) => {
  const [modalData, setModalData] = useState({
    stream: "",
    board: "",
    passingYear: "",
  });
  const [saving, setSaving] = useState(false);

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

  const boardOptions = ["CBSE", "ICSE", "State Board", "IB", "Other"];

  const handleSave = async () => {
    if (!modalData.stream || !modalData.board || !modalData.passingYear) {
      alert("Please fill all required fields");
      return;
    }

    setSaving(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData.token;

      if (!token) {
        alert("Please login again");
        setSaving(false);
        return;
      }

      const updateData = {
        name: user?.name || "",
        email: user?.email || "",
        education: {
          stream: modalData.stream,
          board: modalData.board,
          passingYear: parseInt(modalData.passingYear),
          subjects: user?.education?.subjects || [],
          percentage: user?.education?.percentage || "",
        },
        examScores: user?.examScores || [],
        preferences: user?.preferences || {
          preferredStreams: [],
          budget: { min: 0, max: 1000000 },
          location: { preferredStates: [], preferredCities: [] },
          collegeType: [],
        },
      };

      const response = await axios.put(`${API_URL}/auth/profile`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onComplete) {
        onComplete(response.data.user);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save details");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-500" />
            Complete Education Details
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Please provide your basic education details to get personalized
          recommendations.
        </p>

        <div className="space-y-4">
          {/* Stream */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Stream <span className="text-red-500">*</span>
            </label>
            <select
              value={modalData.stream}
              onChange={(e) =>
                setModalData({ ...modalData, stream: e.target.value })
              }
              className="input-field w-full"
              required
            >
              <option value="">Select Your Stream</option>
              {streamOptions.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>

          {/* Board */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Board <span className="text-red-500">*</span>
            </label>
            <select
              value={modalData.board}
              onChange={(e) =>
                setModalData({ ...modalData, board: e.target.value })
              }
              className="input-field w-full"
              required
            >
              <option value="">Select Board</option>
              {boardOptions.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>

          {/* Passing Year */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={modalData.passingYear}
              onChange={(e) =>
                setModalData({ ...modalData, passingYear: e.target.value })
              }
              className="input-field w-full"
              min="2020"
              max="2030"
              placeholder="2024"
              required
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save & Continue"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          This information is required to provide personalized college
          recommendations
        </p>
      </div>
    </div>
  );
};

export default StreamSelectionModal;
