import { useTheme } from "next-themes";
import { Moon, Sun } from "../icons";

interface Props {
  className?: string;
}

const ToggleThemeButton = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={`${className} cursor-default lg:cursor-pointer`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className="fill-dark" />
      ) : (
        <Moon className="fill-dark" />
      )}
    </button>
  );
};

export default ToggleThemeButton;
