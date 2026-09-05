import ResultsView from '@/components/ResultsView';

export default function ResultsPage({ params }: { params: { id: string } }) {
  return <ResultsView assessmentId={params.id} />;
}
