import { useCallback, useState } from 'react';
import { IP_ADDRESS } from '../../Global';
import Button from '../Button/Button';
import TopicSelection from '../Search/TopicSelection';
import { Category } from '../../api/model/experience';

interface RecommendationProps {
  onRecommendationsGenerated?: (recommendations: any) => void;
}

const allTopics = [
  Category.TECHNOLOGY,
  Category.SCIENCE,
  Category.BIOLOGY,
  Category.CHEMISTRY,
  Category.PHYSICS,
  Category.MATH,
  Category.ENGINEERING,
  Category.BUSINESS,
  Category.MEDICAL,
  Category.CULINARY,
  Category.MUSIC,
  Category.ATHLETICS,
  Category.ART,
  Category.THEATER,
  Category.DANCE,
  Category['LANGUAGE ARTS'],
  Category.SPELLING,
  Category.GEOGRAPHY,
  Category.HISTORY,
  Category['FOREIGN LANGUAGE'],
  Category.CHESS,
  Category.RESEARCH,
  Category.OTHER
];

const Recommendation = ({
  onRecommendationsGenerated
}: RecommendationProps) => {
  const [topics, setTopics] = useState<Category[]>([]);
  const onGenerateRecommendations = useCallback(() => {
    fetch(`${IP_ADDRESS}/recommendations`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        preferenceVec: allTopics.map((topic) =>
          topics.indexOf(topic) === -1 ? 0 : 1
        )
      })
    });

    onRecommendationsGenerated?.(0);
  }, [onRecommendationsGenerated, topics]);

  return (
    <>
      <TopicSelection onTopicChange={setTopics} />
      <Button
        onClick={onGenerateRecommendations}
        text={'Generate Recommendations'}
      />
    </>
  );
};

export default Recommendation;
