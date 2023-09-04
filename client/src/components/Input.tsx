import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  disabled?: boolean;
  type?: string;
  placeholder: string;
  children?: any;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  children,
  disabled,
  type = "text",
  register,
  required,
}) => {
  return (
    <div className="w-full flex justify-center pb-4">
      <input
        id={id}
        className="text-white/80 font-bold bg-transparent border-2 border-[#DC8A00] w-[50%] p-3 focus:outline-none"
        placeholder={placeholder}
        {...register(id, { required })}
        type={type}
        disabled={disabled}
      ></input>
      <div className="w-[10%] h-full bg-[#DC8A00] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Input;
