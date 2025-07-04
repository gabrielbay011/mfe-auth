import { InputProps } from "../types/input-types";

export default function Input({
  type,
  id,
  autoComplete,
  label,
  register,
}: InputProps) {
  return (
    <div className="mt-3 m-5">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        className="rounded-md bg-white p-1 w-full"
        type={type}
        id={id}
        autoComplete={autoComplete}
        {...register}
      />
    </div>
  );
}
