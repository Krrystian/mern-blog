interface ButtonProps {
  onClick: () => void;
  label: string;
}
const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button
      className="w-[60%] bg-[#DC8A00] p-3 mb-1 font-bold"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
