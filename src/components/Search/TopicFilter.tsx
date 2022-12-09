import { ChangeEventHandler, useState } from 'react';
import MultipleSelect from '../InputComponents/MultipleSelect';

interface TopicFilterProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ onChange }) => {
  const [topics, setTopics] = useState<string[]>();

  return (
    <>
      <MultipleSelect
        name="technology"
        value="Technology"
        onChange={(e) => {
          if (e.currentTarget.checked) {
            if (topics?.includes()) {
              
            }
            setTopics([...(topics || []), e.currentTarget.value]);
          } else {
            
          }
        }}
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
