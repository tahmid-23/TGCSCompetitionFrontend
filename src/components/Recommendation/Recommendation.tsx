import { useCallback, useState } from 'react';
import { IP_ADDRESS } from '../../Global';
import Button from '../Button/Button';
import TopicFilter from '../Search/TopicFilter';

interface RecommendationProps {
  onRecommendationsGenerated?: (recommendations: any) => void;
}

const allTopics = [
  'TECHNOLOGY',
  'SCIENCE',
  'BIOLOGY',
  'CHEMISTRY',
  'PHYSICS',
  'MATH',
  'ENGINEERING',
  'BUSINESS',
  'MEDICAL',
  'CULINARY',
  'MUSIC',
  'ATHLETICS',
  'ART',
  'THEATER',
  'DANCE',
  'LANGUAGE ARTS',
  'SPELLING',
  'GEOGRAPHY',
  'HISTORY',
  'FOREIGN LANGUAGE',
  'CHESS',
  'RESEARCH',
  'OTHER'
];

const Recommendation = ({
  onRecommendationsGenerated
}: RecommendationProps) => {
  const [topics, setTopics] = useState<string[]>([]);
  const onGenerateRecommendations = useCallback(() => {
    fetch(`${IP_ADDRESS}/recommendations`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        preferenceVec: allTopics.map((topic) =>
          topics.indexOf(topic.toUpperCase()) === -1 ? 0 : 1
        )
      })
    });

    onRecommendationsGenerated?.(0);
  }, [onRecommendationsGenerated, topics]);

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
