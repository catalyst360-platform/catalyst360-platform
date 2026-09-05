import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Catalyst 360™</h1>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Start Assessment
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-24 px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Catalyst 360™
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Transform Your Institution into an Industry-Ready Ecosystem
        </p>
        <p className="text-lg text-blue-50 mb-12 max-w-3xl mx-auto">
          A comprehensive framework to assess institutional readiness across 8 critical dimensions
        </p>

        <Link
          href="/register"
          className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg text-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          Begin Assessment →
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Catalyst 360™?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">8 Pillars</h4>
              <p className="text-gray-600">
                Comprehensive assessment of Career, Academic, Talent, Advance, Lead, Yardstick, Secure, and Thrive dimensions
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Instant Results</h4>
              <p className="text-gray-600">
                Real-time scoring with actionable insights and personalized recommendations
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Visual Analytics</h4>
              <p className="text-gray-600">
                Interactive charts, radar diagrams, and detailed pillar breakdowns
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📥</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Easy Export</h4>
              <p className="text-gray-600">
                Download results as JSON, CSV, or print as PDF for sharing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            The 8 Pillars of Catalyst
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Career™</h4>
              <p className="text-gray-600 text-sm">Pathways & Industry Integration</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Academic™</h4>
              <p className="text-gray-600 text-sm">Curriculum Core</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Talent™</h4>
              <p className="text-gray-600 text-sm">Student Readiness</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Advance™</h4>
              <p className="text-gray-600 text-sm">Infrastructure & Technology</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Lead™</h4>
              <p className="text-gray-600 text-sm">Faculty Excellence</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Yardstick™</h4>
              <p className="text-gray-600 text-sm">Market Presence</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Secure™</h4>
              <p className="text-gray-600 text-sm">Trust & Community</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🌱</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Thrive™</h4>
              <p className="text-gray-600 text-sm">Growth Ecosystem</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20 px-4 text-center">
        <h3 className="text-4xl font-bold text-white mb-6">
          Ready to Assess Your Institution?
        </h3>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Start your Catalyst 360™ assessment today and discover your institutional readiness level
        </p>
        <Link
          href="/register"
          className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg text-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          Start Now →
        </Link>
      </div>
    </div>
  );
}
