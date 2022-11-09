interface ButtonProps {
  text: string;
  onclick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onclick }) => {
  return (
    <button type="button" onClick={onclick}>
      {text}
    </button>
  );
};

export default Button;
