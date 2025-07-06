import { InputProps } from "../types/input-types";

export default function Input({
  type,
  id,
  autoComplete,
  label,
  register,
}: InputProps) {
  return (
    <div className="m-5 mr-6 ml-6 md:mt-5 md:ml-1 md:mr-1">
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
