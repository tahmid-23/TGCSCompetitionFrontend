import { TextField } from '@mui/material';

interface TextBoxProps {
  name: string;
  id: string;
  value?: string;
}

const TextBox = ({ name, id, value }: TextBoxProps) => {
  return <TextField id={id} label={name} variant="outlined" value={value} />;
};

export default TextBox;
