import { useState } from "react";
import { InputProps } from "../types/input-types";
import eyeClose from "../../public/images/icon-eye-close.svg";
import eyeOpen from "../../public/images/icon-eye-open.svg";

export default function Input({
  type,
  id,
  autoComplete,
  label,
  error,
  register,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={type != "password" ? "m-4" : ""}>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <br />
      <div className="relative">
        <input
          className="rounded-[10px] bg-white p-1 pl-2 w-full focus:outline-purpleMedium"
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
            {showPassword ? (
              <img src={eyeClose} alt="Icone Olho Fechado" />
            ) : (
              <img src={eyeOpen} alt="Icone Olho Aberto" />
            )}
          </button>
        )}
      </div>

      {type && <p className="text-red-600">{error}</p>}
    </div>
  );
}
