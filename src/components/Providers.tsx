import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider enableSystem={false} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
