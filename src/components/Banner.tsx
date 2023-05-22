interface Props {
  title: string;
  className: string;
}

const Banner = ({ className, title }: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
      <h2 className={`text-dark dark:text-light font-semibold ${className}`}>
        {title}
      </h2>
    </div>
  );
};

export default Banner;
