'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PILLARS, QUESTIONS, calculateScores, getReadinessLevel, getRecommendations } from '@/lib/scoring';
import { saveToLocalStorage, getFromLocalStorage } from '@/lib/storage';

export default function Assessment() {
  const router = useRouter();
  const [currentPillar, setCurrentPillar] = useState(0);
  const [responses, setResponses] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(false);
  const [trainerData, setTrainerData] = useState<any>(null);

  useEffect(() => {
    const data = getFromLocalStorage('trainerData');
    const savedResponses = getFromLocalStorage('responses');
    if (data) setTrainerData(data);
    if (savedResponses) setResponses(savedResponses);
  }, []);

  const pillarId = PILLARS[currentPillar].id as keyof typeof QUESTIONS;
  const questions = QUESTIONS[pillarId];
  const progress = ((currentPillar + 1) / PILLARS.length) * 100;

  const handleRating = (questionIndex: number, rating: number) => {
    const newResponses = { ...responses };
    if (!newResponses[pillarId]) {
      newResponses[pillarId] = new Array(questions.length).fill(0);
    }
    newResponses[pillarId][questionIndex] = rating;
    setResponses(newResponses);
    saveToLocalStorage('responses', newResponses);
  };

  const handleNext = () => {
    if (currentPillar < PILLARS.length - 1) {
      setCurrentPillar(currentPillar + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPillar > 0) {
      setCurrentPillar(currentPillar - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const assessmentId = getFromLocalStorage('assessmentId');

    try {
      const { pillarScores, overallScore } = calculateScores(responses);
      const readinessLevel = getReadinessLevel(overallScore);
      const recommendations = getRecommendations(pillarScores);

      const result = {
        assessmentId,
        timestamp: new Date().toISOString(),
        trainer: trainerData,
        responses,
        pillarScores,
        overallScore,
        readinessLevel,
        recommendations,
      };

      saveToLocalStorage('results', result);
      router.push(`/results/${assessmentId}`);
    } catch (error) {
      alert('Error submitting assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {PILLARS[currentPillar].name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{PILLARS[currentPillar].description}</p>
            </div>
            <span className="text-sm font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
              {currentPillar + 1} / {PILLARS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questions Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-8">
            {questions.map((question, idx) => (
              <div key={idx} className="pb-8 border-b last:border-b-0">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Q{idx + 1}. {question}
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRating(idx, rating)}
                      className={`py-3 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
                        responses[pillarId]?.[idx] === rating
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">1 = Strongly Disagree | 5 = Strongly Agree</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPillar === 0}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous Pillar
          </button>

          {currentPillar === PILLARS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : '✓ Submit & Get Results'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Next Pillar →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
