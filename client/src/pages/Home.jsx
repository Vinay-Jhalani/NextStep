import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Target,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Next Step to a<br />
              <span className="text-primary-600">Brighter Future</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover your perfect career path with personalized guidance. Take
              our RIASEC quiz, explore programs, and find the right college for
              your dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="btn-primary inline-flex items-center justify-center text-lg"
              >
                Take Career Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/programs"
                className="btn-secondary inline-flex items-center justify-center text-lg"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose NextStep?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to make informed education decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">RIASEC Quiz</h3>
              <p className="text-gray-600">
                Discover your career interests based on the
                scientifically-proven RIASEC model
              </p>
            </div>

            <div className="card text-center hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Program Directory</h3>
              <p className="text-gray-600">
                Browse through hundreds of programs matched to your interests
                and goals
              </p>
            </div>

            <div className="card text-center hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">College Search</h3>
              <p className="text-gray-600">
                Compare public and private colleges with detailed information
                and rankings
              </p>
            </div>

            <div className="card text-center hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Insights</h3>
              <p className="text-gray-600">
                Get salary insights, placement statistics, and career path
                information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIASEC Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Understanding RIASEC
            </h2>
            <p className="text-xl text-gray-600">
              The six career interest types that guide your future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-600 mb-2">
                Realistic (Doers)
              </h3>
              <p className="text-gray-700">
                Hands-on work, building, fixing things. Engineering,
                construction, mechanics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Investigative (Thinkers)
              </h3>
              <p className="text-gray-700">
                Research, analyzing data, solving complex problems. Science,
                medicine, IT.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-600 mb-2">
                Artistic (Creators)
              </h3>
              <p className="text-gray-700">
                Creative expression, design, arts. Design, music, writing,
                media.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-600 mb-2">
                Social (Helpers)
              </h3>
              <p className="text-gray-700">
                Helping others, teaching, healthcare. Nursing, education,
                counseling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-600 mb-2">
                Enterprising (Persuaders)
              </h3>
              <p className="text-gray-700">
                Leadership, business, sales. Management, entrepreneurship,
                marketing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Conventional (Organizers)
              </h3>
              <p className="text-gray-700">
                Organization, data management, structure. Accounting,
                administration, finance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Path?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who have discovered their ideal career
            with NextStep
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                200+
              </div>
              <div className="text-gray-600">Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                10k+
              </div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                95%
              </div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
