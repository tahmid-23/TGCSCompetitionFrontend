import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const QuickNavigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </Button>
      &nbsp;
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </>
  );
};

export default QuickNavigation;
