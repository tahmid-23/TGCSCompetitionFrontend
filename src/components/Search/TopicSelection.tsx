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
        label={getCategoryDisplay(Category.TECHNOLOGY)}
        control={
          <Checkbox
            name="technology"
            value={Category[Category.TECHNOLOGY]}
            defaultChecked={technology}
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
            defaultChecked={science}
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
            defaultChecked={biology}
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
            defaultChecked={chemistry}
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
            defaultChecked={physics}
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
            defaultChecked={math}
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
            defaultChecked={engineering}
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
            defaultChecked={business}
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
            defaultChecked={medical}
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
            defaultChecked={culinary}
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
            defaultChecked={music}
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
            defaultChecked={athletics}
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
            defaultChecked={art}
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
            defaultChecked={theater}
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
            defaultChecked={dance}
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
            defaultChecked={languageArts}
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
            defaultChecked={geography}
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
            defaultChecked={spelling}
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
            defaultChecked={history}
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
            defaultChecked={foreignLanguage}
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
            defaultChecked={chess}
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
            defaultChecked={research}
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
            defaultChecked={other}
            onChange={onChange}
          />
        }
      />
    </div>
  );
};

export default TopicSelection;
