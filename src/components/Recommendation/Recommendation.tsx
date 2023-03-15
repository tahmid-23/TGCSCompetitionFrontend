import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import TopicFilter from '../Search/TopicFilter';

interface RecommendationProps {
  onRecommendationsGenerated?: (recommendations: any) => void;
}

const Recommendation = ({
  onRecommendationsGenerated
}: RecommendationProps) => {
  const [topics, setTopics] = useState<string[]>([]);
  const onGenerateRecommendations = useCallback(() => {
    onRecommendationsGenerated?.(0);
  }, [onRecommendationsGenerated]);

  return (
    <>
      <TopicFilter onTopicChange={setTopics} />
      <Button
        onClick={onGenerateRecommendations}
        text={'Generate Recommendations'}
      />
    </>
  );
};

export default Recommendation;
