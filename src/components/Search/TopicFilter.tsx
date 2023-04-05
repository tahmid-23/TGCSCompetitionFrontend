import { ChangeEvent, useCallback, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface TopicFilterProps {
  onTopicChange?: (arg0: string[]) => void;
}

const TopicFilter = ({ onTopicChange }: TopicFilterProps) => {
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
      />
      <MultipleSelect name="science" value="Science" onChange={onChange} />
      <MultipleSelect name="bio" value="Biology" onChange={onChange} />
      <MultipleSelect name="chem" value="Chemistry" onChange={onChange} />
      <MultipleSelect name="physics" value="Physics" onChange={onChange} />
      <MultipleSelect name="math" value="Math" onChange={onChange} />
      <MultipleSelect
        name="engineering"
        value="Engineering"
        onChange={onChange}
      />
      <MultipleSelect name="business" value="Business" onChange={onChange} />
      <br />
      <MultipleSelect name="medical" value="Medical" onChange={onChange} />
      <MultipleSelect name="culinary" value="Culinary" onChange={onChange} />
      <MultipleSelect name="music" value="Music" onChange={onChange} />
      <MultipleSelect name="sports" value="Athletics" onChange={onChange} />
      <MultipleSelect name="art" value="Art" onChange={onChange} />
      <MultipleSelect name="theater" value="Theater" onChange={onChange} />
      <MultipleSelect name="dance" value="Dance" onChange={onChange} />
      <MultipleSelect
        name="english"
        value="Language Arts"
        onChange={onChange}
      />
      <br />
      <MultipleSelect name="geo" value="Geography" onChange={onChange} />
      <MultipleSelect name="spelling" value="Spelling" onChange={onChange} />
      <MultipleSelect name="history" value="History" onChange={onChange} />
      <MultipleSelect
        name="foreign"
        value="Foreign Language"
        onChange={onChange}
      />
      <MultipleSelect name="chess" value="Chess" onChange={onChange} />
      <MultipleSelect name="research" value="Research" onChange={onChange} />
      <MultipleSelect name="other" value="Other" onChange={onChange} />
    </>
  );
};

export default TopicFilter;
