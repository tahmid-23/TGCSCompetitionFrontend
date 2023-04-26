import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface TopicFilterProps {
  onTopicChange?: (arg0: string[]) => void;
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

const TopicFilter = ({
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
}: TopicFilterProps) => {
  const [topics, setTopics] = useState<string[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newTopics;
      if (e.currentTarget.checked) {
        setTopics((newTopics = topics.concat(e.currentTarget.value)));
      } else {
        setTopics(
          (newTopics = topics.filter(
            (topic) => topic !== e.currentTarget.value
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
        value="Technology"
        defaultChecked={technology}
        onChange={onChange}
      />
      <MultipleSelect
        name="science"
        value="Science"
        defaultChecked={science}
        onChange={onChange}
      />
      <MultipleSelect
        name="bio"
        value="Biology"
        defaultChecked={biology}
        onChange={onChange}
      />
      <MultipleSelect
        name="chem"
        value="Chemistry"
        defaultChecked={chemistry}
        onChange={onChange}
      />
      <MultipleSelect
        name="physics"
        value="Physics"
        defaultChecked={physics}
        onChange={onChange}
      />
      <MultipleSelect
        name="math"
        value="Math"
        defaultChecked={math}
        onChange={onChange}
      />
      <MultipleSelect
        name="engineering"
        value="Engineering"
        defaultChecked={engineering}
        onChange={onChange}
      />
      <MultipleSelect
        name="business"
        value="Business"
        defaultChecked={business}
        onChange={onChange}
      />
      <br />
      <MultipleSelect
        name="medical"
        value="Medical"
        defaultChecked={medical}
        onChange={onChange}
      />
      <MultipleSelect
        name="culinary"
        value="Culinary"
        defaultChecked={culinary}
        onChange={onChange}
      />
      <MultipleSelect
        name="music"
        value="Music"
        defaultChecked={music}
        onChange={onChange}
      />
      <MultipleSelect
        name="sports"
        value="Athletics"
        defaultChecked={athletics}
        onChange={onChange}
      />
      <MultipleSelect
        name="art"
        value="Art"
        defaultChecked={art}
        onChange={onChange}
      />
      <MultipleSelect
        name="theater"
        value="Theater"
        defaultChecked={theater}
        onChange={onChange}
      />
      <MultipleSelect
        name="dance"
        value="Dance"
        defaultChecked={dance}
        onChange={onChange}
      />
      <MultipleSelect
        name="english"
        value="Language Arts"
        defaultChecked={languageArts}
        onChange={onChange}
      />
      <br />
      <MultipleSelect
        name="geo"
        value="Geography"
        defaultChecked={geography}
        onChange={onChange}
      />
      <MultipleSelect
        name="spelling"
        value="Spelling"
        defaultChecked={spelling}
        onChange={onChange}
      />
      <MultipleSelect
        name="history"
        value="History"
        defaultChecked={history}
        onChange={onChange}
      />
      <MultipleSelect
        name="foreign"
        value="Foreign Language"
        defaultChecked={foreignLanguage}
        onChange={onChange}
      />
      <MultipleSelect
        name="chess"
        value="Chess"
        defaultChecked={chess}
        onChange={onChange}
      />
      <MultipleSelect
        name="research"
        value="Research"
        defaultChecked={research}
        onChange={onChange}
      />
      <MultipleSelect
        name="other"
        value="Other"
        defaultChecked={other}
        onChange={onChange}
      />
    </>
  );
};

export default TopicFilter;
