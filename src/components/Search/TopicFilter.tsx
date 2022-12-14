import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface TopicFilterProps {
  onTopicChange?: (arg0: string[]) => void;
}

const TopicFilter = (
  {
    onTopicChange
  }: TopicFilterProps
) => {
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
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="science"
        value="Science"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="bio"
        value="Biology"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="chem"
        value="Chemistry"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="physics"
        value="Physics"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="math"
        value="Math"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="engineering"
        value="Engineering"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="business"
        value="Business"
        onChange={onChange}
      ></MultipleSelect>
      <br></br>
      <MultipleSelect
        name="medical"
        value="Medical"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="culinary"
        value="Culinary"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="music"
        value="Music"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="sports"
        value="Athletics"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="art"
        value="Art"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="theater"
        value="Theater"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="dance"
        value="Dance"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="english"
        value="Language Arts"
        onChange={onChange}
      ></MultipleSelect>
      <br></br>
      <MultipleSelect
        name="geo"
        value="Geography"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="spelling"
        value="Spelling"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="history"
        value="History"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="foreign"
        value="Foreign Language"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="chess"
        value="Chess"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="reasearch"
        value="Research"
        onChange={onChange}
      ></MultipleSelect>
      <MultipleSelect
        name="other"
        value="Other"
        onChange={onChange}
      ></MultipleSelect>
    </>
  );
};

export default TopicFilter;
