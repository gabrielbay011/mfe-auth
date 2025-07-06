import { useState } from "react";
import { InputProps } from "../types/input-types";
import eyeClose from "../../public/images/icon-eye-close.svg";
import eyeOpen from "../../public/images/icon-eye-open.svg";

export default function Input({
  type,
  id,
  autoComplete,
  label,
  register,
  error,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mt-5 mr-6 ml-6 md:ml-1 md:mr-1">
      <label htmlFor={id}>{label}</label>
      <br />
      <div className="relative">
        <input
          className="rounded-[10px] bg-white p-1 w-full"
          type={inputType}
          id={id}
          autoComplete={autoComplete}
          {...register}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <img src={eyeClose} alt="Icone Olho Fechado" /> : <img src={eyeOpen} alt="Icone Olho Aberto" /> }
          </button>
        )}
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
