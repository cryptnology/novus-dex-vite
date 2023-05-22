interface Props {
  className: string;
}

const Banner = ({ className }: Props) => {
  return (
    <div className="flex justify-center items-center h-full">
      <h2 className={`text-dark dark:text-light font-semibold ${className}`}>
        Please connect to MetaMask
      </h2>
    </div>
  );
};

export default Banner;
