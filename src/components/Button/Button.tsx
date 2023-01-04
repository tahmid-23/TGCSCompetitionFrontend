import { MouseEventHandler } from 'react';
import { Link, To } from 'react-router-dom';

interface ButtonProps {
  disabled?: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  to?: To;
}

const Button = (
  {
    disabled,
    text,
    onClick,
    to
  }: ButtonProps
) => {
  let result;
  if (onClick) {
    result = (
      <button type="button" disabled={disabled} onClick={onClick}>
        {text}
      </button>
    );
  } else if (to) {
    result = (
      <Link to={to}>
        <button type="button" disabled={disabled}>
          {text}
        </button>
      </Link>
    );
  } else {
    result = (
      <button type="button" disabled={disabled}>
        {text}
      </button>
    );
  }

  return result;
};

export default Button;
