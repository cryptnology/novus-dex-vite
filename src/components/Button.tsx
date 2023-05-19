interface Props {
  className?: string;
  label: string;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
}

const Button = ({ className, label, type = "button", onClick }: Props) => {
  return (
    <button
      className={`px-6 py-2 text-light font-bold bg-primary rounded-xl hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300 ${className}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
