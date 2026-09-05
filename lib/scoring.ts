export const PILLARS = [
  {
    id: 'career',
    name: 'Catalyst Career™',
    subtitle: 'Pathways & Industry Integration',
    description: 'Establish structured systems for placements and internships, enabling recruiter engagement',
  },
  {
    id: 'academic',
    name: 'Catalyst Academic™',
    subtitle: 'Curriculum Core',
    description: 'Curate industry-aligned curriculum with rigor, adaptability, and relevance',
  },
  {
    id: 'talent',
    name: 'Catalyst Talent™',
    subtitle: 'Student Readiness',
    description: 'Develop industry-ready talent with transferable skills and workplace adaptability',
  },
  {
    id: 'advance',
    name: 'Catalyst Advance™',
    subtitle: 'Infrastructure & Technology',
    description: 'Drive reliable infrastructure and digital adoption supporting teaching, research, and administration, with effective usage of AI',
  },
  {
    id: 'lead',
    name: 'Catalyst Lead™',
    subtitle: 'Faculty Excellence',
    description: 'Enable faculty to adapt to technology evolution, embrace industry-centric practices, and cultivate innovation through AI thinking and design thinking approaches',
  },
  {
    id: 'yardstick',
    name: 'Catalyst Yardstick™',
    subtitle: 'Market Presence',
    description: 'Strengthen institutional brand equity by establishing clear benchmarks for visibility, credibility, and recognition in academic and industry circles',
  },
  {
    id: 'secure',
    name: 'Catalyst Secure™',
    subtitle: 'Trust & Community',
    description: 'Build stakeholder trust by fostering transparent engagement with parents, alumni, and the wider community, strengthening institutional credibility and loyalty',
  },
  {
    id: 'thrive',
    name: 'Catalyst Thrive™',
    subtitle: 'Growth Ecosystem',
    description: 'Build a sustainable ecosystem of partnerships across industry, academia, and community that drive institutional expansion, innovation, and long-term resilience',
  },
];

export const QUESTIONS = {
  career: [
    'Our institution has established structured placement and internship systems',
    'We actively engage with recruiters and industry partners for talent acquisition',
    'Career guidance and counseling services are well-developed and accessible',
    'Alumni feedback is regularly collected and integrated into career planning',
    'Placement rates and employment outcomes meet or exceed industry benchmarks',
  ],
  academic: [
    'Our curriculum is regularly updated to reflect industry and market demands',
    'Interdisciplinary learning and cross-functional projects are embedded in courses',
    'Industry experts contribute to curriculum design and review',
    'Learning outcomes are aligned with employer expectations',
    'Practical, hands-on learning is integrated alongside theoretical knowledge',
  ],
  talent: [
    'Students demonstrate strong foundational skills upon program entry',
    'We have systematic approaches to identify and develop talent gaps',
    'Mentorship and coaching programs are robust and well-structured',
    'Students develop transferable skills applicable across industries',
    'Student success metrics show consistent improvement over time',
  ],
  advance: [
    'Technology infrastructure is modern, reliable, and regularly updated',
    'Digital tools and platforms support effective teaching and learning',
    'AI adoption is strategic and enhances administrative and academic processes',
    'Labs and facilities meet or exceed industry standards',
    'Cybersecurity and data protection measures are in place',
  ],
  lead: [
    'Faculty members have relevant industry experience and expertise',
    'Continuous professional development opportunities are available',
    'Faculty are encouraged to innovate and experiment with new teaching methods',
    'Leadership pipeline exists for faculty career progression',
    'Faculty engagement with industry trends and research is encouraged',
  ],
  yardstick: [
    'Institution has strong recognition and reputation in the market',
    'Visibility and brand presence among employers is growing',
    'Alumni success stories demonstrate institutional impact',
    'Rankings and industry recognitions are achieved and communicated',
    'Partnerships and collaborations strengthen market credibility',
  ],
  secure: [
    'Transparent communication with parents and community is maintained',
    'Alumni engagement and support programs are active',
    'Institutional credibility and trust among stakeholders is strong',
    'Governance and ethical practices are well-established',
    'Student outcomes and satisfaction levels are consistently high',
  ],
  thrive: [
    'Institution has a clear strategic vision for growth and innovation',
    'Partnerships with industry, academia, and community are strategically developed',
    'Resource allocation supports institutional growth priorities',
    'Organizational culture encourages innovation and continuous improvement',
    'Long-term sustainability and institutional resilience are prioritized',
  ],
};

export function calculateScores(responses: Record<string, number[]>) {
  const pillarScores: Record<string, number> = {};

  Object.entries(responses).forEach(([pillar, scores]) => {
    if (scores.length > 0) {
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      pillarScores[pillar] = Math.round((average / 5) * 100);
    }
  });

  const validScores = Object.values(pillarScores);
  const overallScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;

  return { pillarScores, overallScore };
}

export function getReadinessLevel(score: number): string {
  if (score <= 25) return 'Emerging';
  if (score <= 50) return 'Developing';
  if (score <= 75) return 'Advanced';
  return 'Leading';
}

export function getReadinessColor(score: number): string {
  if (score <= 25) return '#ef4444';
  if (score <= 50) return '#f97316';
  if (score <= 75) return '#22c55e';
  return '#10b981';
}

export function getRecommendations(pillarScores: Record<string, number>): Record<string, string> {
  const recommendations: Record<string, string> = {};

  Object.entries(pillarScores).forEach(([pillar, score]) => {
    if (score < 40) {
      recommendations[pillar] = '🔴 Emerging: Focus on building foundational strength. Develop action plans and allocate resources strategically.';
    } else if (score < 60) {
      recommendations[pillar] = '🟡 Developing: Strengthen through structured initiatives. Scale successful programs and measure impact consistently.';
    } else if (score < 75) {
      recommendations[pillar] = '🟢 Advanced: Maintain momentum and scale impact. Explore innovation opportunities and share best practices.';
    } else {
      recommendations[pillar] = '💚 Leading: Excellent progress! Position as industry benchmark and mentor peer institutions.';
    }
  });

  return recommendations;
}
