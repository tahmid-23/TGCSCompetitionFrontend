import { ChangeEvent, useCallback, useState } from 'react';
import { Category, getCategoryDisplay } from '../../api/model/experience';
import { FormControlLabel, Checkbox } from '@mui/material';

interface TopicSelectionProps {
  onTopicChange?: (arg0: Category[]) => void;
  technology?: boolean;
  science?: boolean;
  biology?: boolean;
  chemistry?: boolean;
  physics?: boolean;
  math?: boolean;
  engineering?: boolean;
  business?: boolean;
  medical?: boolean;
  culinary?: boolean;
  music?: boolean;
  athletics?: boolean;
  art?: boolean;
  theater?: boolean;
  dance?: boolean;
  languageArts?: boolean;
  geography?: boolean;
  spelling?: boolean;
  history?: boolean;
  foreignLanguage?: boolean;
  chess?: boolean;
  research?: boolean;
  other?: boolean;
}

const TopicSelection = ({
  onTopicChange,
  technology,
  science,
  biology,
  chemistry,
  physics,
  math,
  engineering,
  business,
  medical,
  culinary,
  music,
  athletics,
  art,
  theater,
  dance,
  languageArts,
  geography,
  spelling,
  history,
  foreignLanguage,
  chess,
  research,
  other
}: TopicSelectionProps) => {
  const [topics, setTopics] = useState<Category[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newTopics;
      if (e.currentTarget.checked) {
        setTopics(
          (newTopics = topics.concat(
            Category[e.currentTarget.value as keyof typeof Category]
          ))
        );
      } else {
        setTopics(
          (newTopics = topics.filter(
            (topic) =>
              topic !== Category[e.currentTarget.value as keyof typeof Category]
          ))
        );
      }

      onTopicChange?.(newTopics);
    },
    [onTopicChange, topics]
  );

  return (
    <div>
      <FormControlLabel
        name="technology"
        label={getCategoryDisplay(Category.TECHNOLOGY)}
        control={
          <Checkbox
            value={Category[Category.TECHNOLOGY]}
            defaultChecked={technology}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="science"
        label={getCategoryDisplay(Category.SCIENCE)}
        control={
          <Checkbox
            value={Category[Category.SCIENCE]}
            defaultChecked={science}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="biology"
        label={getCategoryDisplay(Category.BIOLOGY)}
        control={
          <Checkbox
            value={Category[Category.BIOLOGY]}
            defaultChecked={biology}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="chemistry"
        label={getCategoryDisplay(Category.CHEMISTRY)}
        control={
          <Checkbox
            value={Category[Category.CHEMISTRY]}
            defaultChecked={chemistry}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="physics"
        label={getCategoryDisplay(Category.PHYSICS)}
        control={
          <Checkbox
            value={Category[Category.PHYSICS]}
            defaultChecked={physics}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="math"
        label={getCategoryDisplay(Category.MATH)}
        control={
          <Checkbox
            value={Category[Category.MATH]}
            defaultChecked={math}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="engineering"
        label={getCategoryDisplay(Category.ENGINEERING)}
        control={
          <Checkbox
            value={Category[Category.ENGINEERING]}
            defaultChecked={engineering}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="business"
        label={getCategoryDisplay(Category.BUSINESS)}
        control={
          <Checkbox
            value={Category[Category.BUSINESS]}
            defaultChecked={business}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="medical"
        label={getCategoryDisplay(Category.MEDICAL)}
        control={
          <Checkbox
            value={Category[Category.MEDICAL]}
            defaultChecked={medical}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="culinary"
        label={getCategoryDisplay(Category.CULINARY)}
        control={
          <Checkbox
            value={Category[Category.CULINARY]}
            defaultChecked={culinary}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="music"
        label={getCategoryDisplay(Category.MUSIC)}
        control={
          <Checkbox
            value={Category[Category.MUSIC]}
            defaultChecked={music}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="athletics"
        label={getCategoryDisplay(Category.ATHLETICS)}
        control={
          <Checkbox
            value={Category[Category.ATHLETICS]}
            defaultChecked={athletics}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="art"
        label={getCategoryDisplay(Category.ART)}
        control={
          <Checkbox
            value={Category[Category.ART]}
            defaultChecked={art}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="theater"
        label={getCategoryDisplay(Category.THEATER)}
        control={
          <Checkbox
            value={Category[Category.THEATER]}
            defaultChecked={theater}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="dance"
        label={getCategoryDisplay(Category.DANCE)}
        control={
          <Checkbox
            value={Category[Category.DANCE]}
            defaultChecked={dance}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="languageArts"
        label={getCategoryDisplay(Category['LANGUAGE ARTS'])}
        control={
          <Checkbox
            value={Category[Category['LANGUAGE ARTS']]}
            defaultChecked={languageArts}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="geography"
        label={getCategoryDisplay(Category.GEOGRAPHY)}
        control={
          <Checkbox
            value={Category[Category.GEOGRAPHY]}
            defaultChecked={geography}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="spelling"
        label={getCategoryDisplay(Category.SPELLING)}
        control={
          <Checkbox
            value={Category[Category.SPELLING]}
            defaultChecked={spelling}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="history"
        label={getCategoryDisplay(Category.HISTORY)}
        control={
          <Checkbox
            value={Category[Category.HISTORY]}
            defaultChecked={history}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="foreignLanguage"
        label={getCategoryDisplay(Category['FOREIGN LANGUAGE'])}
        control={
          <Checkbox
            value={Category[Category['FOREIGN LANGUAGE']]}
            defaultChecked={foreignLanguage}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="chess"
        label={getCategoryDisplay(Category.CHESS)}
        control={
          <Checkbox
            value={Category[Category.CHESS]}
            defaultChecked={chess}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="research"
        label={getCategoryDisplay(Category.RESEARCH)}
        control={
          <Checkbox
            value={Category[Category.RESEARCH]}
            defaultChecked={research}
            onChange={onChange}
          />
        }
      />
      <FormControlLabel
        name="other"
        label={getCategoryDisplay(Category.OTHER)}
        control={
          <Checkbox
            value={Category[Category.OTHER]}
            defaultChecked={other}
            onChange={onChange}
          />
        }
      />
    </div>
  );
};

export default TopicSelection;
