import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';
import { Category } from '../../api/model/experience';

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
    <>
      <MultipleSelect
        name="technology"
        value={Category[Category.TECHNOLOGY]}
        label="Technology"
        defaultChecked={technology}
        onChange={onChange}
      />
      <MultipleSelect
        name="science"
        value={Category[Category.SCIENCE]}
        label="Science"
        defaultChecked={science}
        onChange={onChange}
      />
      <MultipleSelect
        name="bio"
        value={Category[Category.BIOLOGY]}
        label="Biology"
        defaultChecked={biology}
        onChange={onChange}
      />
      <MultipleSelect
        name="chem"
        value={Category[Category.CHEMISTRY]}
        label="Chemistry"
        defaultChecked={chemistry}
        onChange={onChange}
      />
      <MultipleSelect
        name="physics"
        value={Category[Category.PHYSICS]}
        label="Physics"
        defaultChecked={physics}
        onChange={onChange}
      />
      <MultipleSelect
        name="math"
        value={Category[Category.MATH]}
        label="Math"
        defaultChecked={math}
        onChange={onChange}
      />
      <MultipleSelect
        name="engineering"
        value={Category[Category.ENGINEERING]}
        label="Engineering"
        defaultChecked={engineering}
        onChange={onChange}
      />
      <MultipleSelect
        name="business"
        value={Category[Category.BUSINESS]}
        label="Business"
        defaultChecked={business}
        onChange={onChange}
      />
      <br />
      <MultipleSelect
        name="medical"
        value={Category[Category.MEDICAL]}
        label="Medical"
        defaultChecked={medical}
        onChange={onChange}
      />
      <MultipleSelect
        name="culinary"
        value={Category[Category.CULINARY]}
        label="Culinary"
        defaultChecked={culinary}
        onChange={onChange}
      />
      <MultipleSelect
        name="music"
        value={Category[Category.MUSIC]}
        label="Music"
        defaultChecked={music}
        onChange={onChange}
      />
      <MultipleSelect
        name="sports"
        value={Category[Category.ATHLETICS]}
        label="Athletics"
        defaultChecked={athletics}
        onChange={onChange}
      />
      <MultipleSelect
        name="art"
        value={Category[Category.ART]}
        label="Art"
        defaultChecked={art}
        onChange={onChange}
      />
      <MultipleSelect
        name="theater"
        value={Category[Category.THEATER]}
        label="Theater"
        defaultChecked={theater}
        onChange={onChange}
      />
      <MultipleSelect
        name="dance"
        value={Category[Category.DANCE]}
        label="Dance"
        defaultChecked={dance}
        onChange={onChange}
      />
      <MultipleSelect
        name="english"
        value={Category[Category['LANGUAGE ARTS']]}
        label="Language Arts"
        defaultChecked={languageArts}
        onChange={onChange}
      />
      <br />
      <MultipleSelect
        name="geo"
        value={Category[Category.GEOGRAPHY]}
        label="Geography"
        defaultChecked={geography}
        onChange={onChange}
      />
      <MultipleSelect
        name="spelling"
        value={Category[Category.SPELLING]}
        label="Spelling"
        defaultChecked={spelling}
        onChange={onChange}
      />
      <MultipleSelect
        name="history"
        value={Category[Category.HISTORY]}
        label="History"
        defaultChecked={history}
        onChange={onChange}
      />
      <MultipleSelect
        name="foreign"
        value={Category[Category['FOREIGN LANGUAGE']]}
        label="Foreign Language"
        defaultChecked={foreignLanguage}
        onChange={onChange}
      />
      <MultipleSelect
        name="chess"
        value={Category[Category.CHESS]}
        label="Chess"
        defaultChecked={chess}
        onChange={onChange}
      />
      <MultipleSelect
        name="research"
        value={Category[Category.RESEARCH]}
        label="Research"
        defaultChecked={research}
        onChange={onChange}
      />
      <MultipleSelect
        name="other"
        value={Category[Category.OTHER]}
        label="Other"
        defaultChecked={other}
        onChange={onChange}
      />
    </>
  );
};

export default TopicSelection;
