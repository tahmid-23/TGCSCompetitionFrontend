import { MouseEventHandler } from 'react';
import { Link, To } from 'react-router-dom';

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  to?: To;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, to }) => {
  let result;
  if (onClick) {
    result = (
      <button type="button" onClick={onClick}>
        {text}
      </button>
    );
  } else if (to) {
    result = (
      <Link to={to}>
        <button type="button">{text}</button>
      </Link>
    );
  } else {
    result = <button type="button">{text}</button>;
  }

  return result;
};

export default Button;
