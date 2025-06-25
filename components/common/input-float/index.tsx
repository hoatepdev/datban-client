import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, useState } from "react";
import Main from "./styled";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFloatProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  register?: UseFormRegisterReturn<string>;
}

const InputFloat = ({
  label = "",
  message,
  children,
  register,
  ...props
}: InputFloatProps) => {
  return (
    <Main>
      <Input
        {...props}
        {...register}
        placeholder=" "
        autoComplete={props.autoComplete || "off"}
      />
      {label && <label>{label}</label>}
      {children}
      {message && (
        <p className="message-error" role="alert">
          {message}
        </p>
      )}
    </Main>
  );
};

InputFloat.Password = function Password({ ...props }: InputFloatProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((pre) => !pre);
  return (
    <InputFloat type={showPassword ? "text" : "password"} {...props}>
      <button
        type="button"
        tabIndex={-1}
        onClick={togglePassword}
        className="input-icon-btn"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </InputFloat>
  );
};

export default InputFloat;
