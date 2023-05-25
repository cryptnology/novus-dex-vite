import { ChangeEvent } from "react";

interface Props {
  className?: string;
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const regex = /^\d+\.?\d{0,5}$/;

const Input = ({
  className,
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <>
      <label htmlFor="token0" className="text-sm">
        {label}
      </label>
      <input
        className={`bg-secondary dark:bg-secondaryDark rounded-xl mt-1 p-3 w-full text-dark dark:text-light outline-none focus:outline-primary dark:focus:outline-primaryDark outline-offset-0 ${className}`}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (e.target.value === "" || regex.test(e.target.value)) onChange(e);
        }}
      />
    </>
  );
};

export default Input;
