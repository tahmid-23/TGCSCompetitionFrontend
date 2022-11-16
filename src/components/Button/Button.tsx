import { Link, To } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to: To;
}

const Button: React.FC<ButtonProps> = ({ text, to }) => {
  return (
    <Link to={to}>
      <button type="button">{text}</button>
    </Link>
  );
};

export default Button;
