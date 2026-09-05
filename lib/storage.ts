export interface AssessmentResult {
  assessmentId: string;
  timestamp: string;
  trainer: {
    name: string;
    institution: string;
    department: string;
    experience: string;
  };
  responses: Record<string, number[]>;
  pillarScores: Record<string, number>;
  overallScore: number;
  readinessLevel: string;
  recommendations: Record<string, string>;
}

export function saveToLocalStorage(key: string, data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function exportAsJSON(data: AssessmentResult) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `catalyst360_${data.assessmentId}.json`;
  link.click();
}

export function exportAsCSV(data: AssessmentResult) {
  const rows = [
    ['Catalyst 360 Assessment Report'],
    [],
    ['Assessment Details'],
    ['Assessment ID', data.assessmentId],
    ['Timestamp', data.timestamp],
    ['Overall Score', data.overallScore],
    ['Readiness Level', data.readinessLevel],
    [],
    ['Trainer Information'],
    ['Name', data.trainer.name],
    ['Institution', data.trainer.institution],
    ['Department', data.trainer.department],
    ['Experience Level', data.trainer.experience],
    [],
    ['Pillar Scores'],
  ];

  Object.entries(data.pillarScores).forEach(([pillar, score]) => {
    rows.push([pillar, score.toString()]);
  });

  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `catalyst360_${data.assessmentId}.csv`;
  link.click();
}
