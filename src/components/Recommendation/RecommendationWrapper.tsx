import { useState } from 'react';
import Recommendation from './Recommendation';
import RecommendationResult from './RecommendationResult';

const RecommendationWrapper = () => {
  const [recommendations, setRecommendations] = useState();

  if (!recommendations) {
    return <Recommendation onRecommendationsGenerated={setRecommendations} />;
  } else {
    return <RecommendationResult recommendations={recommendations} />;
  }
};

export default RecommendationWrapper;
