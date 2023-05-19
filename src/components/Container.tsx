interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: Props) => {
  return (
    <div className={`px-5 2xl:px-40 lg:px-20 md:px-16 sm:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
