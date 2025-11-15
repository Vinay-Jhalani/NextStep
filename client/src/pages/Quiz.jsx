import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { CheckCircle, Circle } from "lucide-react";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const { data } = await api.get("/quiz");
      setQuiz(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: quiz.questions[currentQuestion]._id,
      profile: option.profile,
      answer: option.text,
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate("/register");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await api.post("/quiz/submit", {
        userId: user._id,
        answers,
      });
      setResult(data);
      updateUser({
        interests: data.interests,
        quizCompleted: true,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Quiz Complete!
              </h1>
              <p className="text-xl text-gray-600">
                Here are your career interest profiles
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Primary Interest
                  </h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {result.interests.primary}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Secondary Interest
                  </h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {result.interests.secondary}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Your Complete Profile
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(result.scores).map(([profile, score]) => (
                  <div key={profile} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-700">{profile}</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {score}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/programs")}
                className="w-full btn-primary"
              >
                View Recommended Programs
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full btn-secondary"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No quiz available</p>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const question = quiz.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const allAnswered =
    answers.length === quiz.questions.length && answers.every((a) => a);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion]?.answer === option.text
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300 bg-white"
                }`}
              >
                <div className="flex items-center">
                  {answers[currentQuestion]?.answer === option.text ? (
                    <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                  )}
                  <span className="text-gray-700 font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        {!user && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-center">
              You need to be logged in to submit the quiz. Your progress is
              saved!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
