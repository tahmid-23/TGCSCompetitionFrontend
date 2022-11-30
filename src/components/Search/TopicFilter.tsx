import MultipleSelect from '../InputComponents/MultipleSelect';

const TopicFilter = () => {
  return (
    <>
      <MultipleSelect name="technology" value="Technology"></MultipleSelect>
      <MultipleSelect name="science" value="Science"></MultipleSelect>
      <MultipleSelect name="bio" value="Biology"></MultipleSelect>
      <MultipleSelect name="chem" value="Chemistry"></MultipleSelect>
      <MultipleSelect name="physics" value="Physics"></MultipleSelect>
      <MultipleSelect name="math" value="Math"></MultipleSelect>
      <MultipleSelect name="engineering" value="Engineering"></MultipleSelect>
      <MultipleSelect name="business" value="Business"></MultipleSelect>
      <br></br>
      <MultipleSelect name="medical" value="Medical"></MultipleSelect>
      <MultipleSelect name="culinary" value="Culinary"></MultipleSelect>
      <MultipleSelect name="music" value="Music"></MultipleSelect>
      <MultipleSelect name="sports" value="Athletics"></MultipleSelect>
      <MultipleSelect name="art" value="Art"></MultipleSelect>
      <MultipleSelect name="theater" value="Theater"></MultipleSelect>
      <MultipleSelect name="dance" value="Dance"></MultipleSelect>
      <MultipleSelect name="english" value="Language Arts"></MultipleSelect>
      <br></br>
      <MultipleSelect name="geo" value="Geography"></MultipleSelect>
      <MultipleSelect name="spelling" value="Spelling"></MultipleSelect>
      <MultipleSelect name="history" value="History"></MultipleSelect>
      <MultipleSelect name="foreign" value="Foreign Language"></MultipleSelect>
      <MultipleSelect name="chess" value="Chess"></MultipleSelect>
      <MultipleSelect name="reasearch" value="Research"></MultipleSelect>
      <MultipleSelect name="other" value="Other"></MultipleSelect>
    </>
  );
};

export default TopicFilter;
