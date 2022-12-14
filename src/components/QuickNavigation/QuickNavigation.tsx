import { useNavigate } from 'react-router';

const QuickNavigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </button>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </>
  );
};

export default QuickNavigation;
