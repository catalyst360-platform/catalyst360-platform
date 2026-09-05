'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToLocalStorage } from '@/lib/storage';

export default function Registration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    trainer: '',
    institution: '',
    department: '',
    experience: 'mid',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.trainer.trim()) newErrors.trainer = 'Trainer name is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const assessmentId = `ASS-${Date.now()}`;

    try {
      saveToLocalStorage('assessmentId', assessmentId);
      saveToLocalStorage('trainerData', formData);
      saveToLocalStorage('responses', {});

      router.push('/assessment');
    } catch (error) {
      alert('Error starting assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Catalyst 360™</h1>
          <p className="text-gray-600 text-sm">Institutional Readiness Assessment Framework</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trainer / Assessor Name *
            </label>
            <input
              type="text"
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors.trainer ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.trainer && <p className="text-red-500 text-xs mt-1">{errors.trainer}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institution Name *
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors.institution ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., XYZ Engineering College"
            />
            {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department *
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Computer Science, Academics"
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Level *
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="junior">Junior (0-3 years)</option>
              <option value="mid">Mid-level (3-8 years)</option>
              <option value="senior">Senior (8+ years)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Starting...' : 'Start Assessment →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          ⏱️ Takes ~10 minutes • ⚡ Instant results • 📊 40 questions across 8 pillars
        </p>
      </div>
    </div>
  );
}
