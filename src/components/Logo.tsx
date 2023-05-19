interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="bg-primary h-16 w-16 flex items-center justify-center rounded-full dark:bg-primaryDark cursor-default">
        <div className="bg-light h-[3.7rem] w-[3.7rem] rounded-full flex items-center justify-center text-sm font-semibold text-primary dark:text-primaryDark dark:bg-dark transition">
          Novus
        </div>
      </div>
    </div>
  );
};

export default Logo;
