'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PILLARS, getReadinessColor } from '@/lib/scoring';
import { getFromLocalStorage, exportAsJSON, exportAsCSV } from '@/lib/storage';

export default function ResultsView({ assessmentId }: { assessmentId: string }) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getFromLocalStorage('results');
    if (data) {
      setResults(data);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No results found</p>
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Start New Assessment
          </a>
        </div>
      </div>
    );
  }

  const { overallScore, readinessLevel, pillarScores, recommendations, trainer } = results;

  const radarData = PILLARS.map((pillar) => ({
    name: pillar.name.replace('Catalyst ', '').replace('™', ''),
    score: pillarScores[pillar.id] || 0,
  }));

  const barData = radarData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Catalyst 360™ Assessment Results</h1>
            <p className="text-gray-600">
              <strong>{trainer.name}</strong> | {trainer.institution} | {trainer.department}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Overall Score */}
            <div className="text-center">
              <div
                className="inline-block text-6xl font-bold mb-2 px-8 py-6 rounded-2xl text-white"
                style={{ backgroundColor: getReadinessColor(overallScore) }}
              >
                {overallScore}
              </div>
              <p className="text-gray-600 text-sm mt-2">Overall Readiness Score</p>
            </div>

            {/* Readiness Level */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 mb-2 text-sm">Readiness Level</p>
              <p
                className="text-3xl font-bold"
                style={{ color: getReadinessColor(overallScore) }}
              >
                {readinessLevel}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {readinessLevel === 'Emerging' && '🔴 Foundation building phase'}
                {readinessLevel === 'Developing' && '🟡 Structured growth phase'}
                {readinessLevel === 'Advanced' && '🟢 Momentum & scale phase'}
                {readinessLevel === 'Leading' && '💚 Benchmark institution'}
              </p>
            </div>

            {/* Assessment Date */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 mb-2 text-sm">Assessment Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(results.timestamp).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm mt-2">Assessment ID: {results.assessmentId}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pillar Analysis (Radar)</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Radar name="Score" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Score Breakdown (Pillars)</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number) => `${value}/100`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getReadinessColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Pillar Assessment & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => {
              const score = pillarScores[pillar.id];
              const recommendation = recommendations[pillar.id];
              return (
                <div
                  key={pillar.id}
                  className="border-l-4 p-6 rounded-lg bg-gray-50"
                  style={{ borderColor: getReadinessColor(score) }}
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{pillar.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{pillar.subtitle}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="text-3xl font-bold text-white px-4 py-2 rounded-lg"
                      style={{ backgroundColor: getReadinessColor(score) }}
                    >
                      {score}
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${score}%`,
                            backgroundColor: getReadinessColor(score),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export & Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Export & Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => exportAsJSON(results)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              📥 Download JSON
            </button>
            <button
              onClick={() => exportAsCSV(results)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              📊 Download CSV
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              🖨️ Print / PDF
            </button>
          </div>
          <div className="pt-6 border-t">
            <a
              href="/register"
              className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              ➕ Start New Assessment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
