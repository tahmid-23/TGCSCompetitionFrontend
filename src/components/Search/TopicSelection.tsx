import { ChangeEvent, useCallback } from 'react';
import { Category, getCategoryDisplay } from '../../api/model/experience';
import { FormControlLabel, Checkbox } from '@mui/material';

interface TopicSelectionProps {
  topics: Category[];
  onTopicChange?: (arg0: Category[]) => void;
}

const TopicSelection = ({ topics, onTopicChange }: TopicSelectionProps) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newTopics;
      if (e.currentTarget.checked) {
        newTopics = topics.concat(
          Category[e.currentTarget.value as keyof typeof Category]
        );
      } else {
        newTopics = topics.filter(
          (topic) =>
            topic !== Category[e.currentTarget.value as keyof typeof Category]
        );
      }

      onTopicChange?.(newTopics);
    },
    [onTopicChange, topics]
  );

  return (
    <div>
      <FormControlLabel
        label={getCategoryDisplay(Category.TECHNOLOGY)}
        control={
          <Checkbox
            name="technology"
            value={Category[Category.TECHNOLOGY]}
            checked={topics.includes(Category.TECHNOLOGY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.SCIENCE)}
        control={
          <Checkbox
            name="science"
            value={Category[Category.SCIENCE]}
            checked={topics.includes(Category.SCIENCE)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.BIOLOGY)}
        control={
          <Checkbox
            name="biology"
            value={Category[Category.BIOLOGY]}
            checked={topics.includes(Category.BIOLOGY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.CHEMISTRY)}
        control={
          <Checkbox
            name="chemistry"
            value={Category[Category.CHEMISTRY]}
            checked={topics.includes(Category.CHEMISTRY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.PHYSICS)}
        control={
          <Checkbox
            name="physics"
            value={Category[Category.PHYSICS]}
            checked={topics.includes(Category.PHYSICS)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.MATH)}
        control={
          <Checkbox
            name="math"
            value={Category[Category.MATH]}
            checked={topics.includes(Category.MATH)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.ENGINEERING)}
        control={
          <Checkbox
            name="engineering"
            value={Category[Category.ENGINEERING]}
            checked={topics.includes(Category.ENGINEERING)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.BUSINESS)}
        control={
          <Checkbox
            name="business"
            value={Category[Category.BUSINESS]}
            checked={topics.includes(Category.BUSINESS)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.MEDICAL)}
        control={
          <Checkbox
            name="medical"
            value={Category[Category.MEDICAL]}
            checked={topics.includes(Category.MEDICAL)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.CULINARY)}
        control={
          <Checkbox
            name="culinary"
            value={Category[Category.CULINARY]}
            checked={topics.includes(Category.CULINARY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.MUSIC)}
        control={
          <Checkbox
            name="music"
            value={Category[Category.MUSIC]}
            checked={topics.includes(Category.MUSIC)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.ATHLETICS)}
        control={
          <Checkbox
            name="athletics"
            value={Category[Category.ATHLETICS]}
            checked={topics.includes(Category.ATHLETICS)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.ART)}
        control={
          <Checkbox
            name="art"
            value={Category[Category.ART]}
            checked={topics.includes(Category.ART)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.THEATER)}
        control={
          <Checkbox
            name="theater"
            value={Category[Category.THEATER]}
            checked={topics.includes(Category.THEATER)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.DANCE)}
        control={
          <Checkbox
            name="dance"
            value={Category[Category.DANCE]}
            checked={topics.includes(Category.DANCE)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category['LANGUAGE ARTS'])}
        control={
          <Checkbox
            name="languageArts"
            value={Category[Category['LANGUAGE ARTS']]}
            checked={topics.includes(Category['LANGUAGE ARTS'])}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.GEOGRAPHY)}
        control={
          <Checkbox
            name="geography"
            value={Category[Category.GEOGRAPHY]}
            checked={topics.includes(Category.GEOGRAPHY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.SPELLING)}
        control={
          <Checkbox
            name="spelling"
            value={Category[Category.SPELLING]}
            checked={topics.includes(Category.SPELLING)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.HISTORY)}
        control={
          <Checkbox
            name="history"
            value={Category[Category.HISTORY]}
            checked={topics.includes(Category.HISTORY)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category['FOREIGN LANGUAGE'])}
        control={
          <Checkbox
            name="foreignLanguage"
            value={Category[Category['FOREIGN LANGUAGE']]}
            checked={topics.includes(Category['FOREIGN LANGUAGE'])}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.CHESS)}
        control={
          <Checkbox
            name="chess"
            value={Category[Category.CHESS]}
            checked={topics.includes(Category.CHESS)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.RESEARCH)}
        control={
          <Checkbox
            name="research"
            value={Category[Category.RESEARCH]}
            checked={topics.includes(Category.RESEARCH)}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        label={getCategoryDisplay(Category.OTHER)}
        control={
          <Checkbox
            name="other"
            value={Category[Category.OTHER]}
            checked={topics.includes(Category.OTHER)}
            onChange={onChange}
          />
        }
      />
    </div>
  );
};

export default TopicSelection;
