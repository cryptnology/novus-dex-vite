import { motion } from "framer-motion";

import { CheckOutsideClick, SelectNetwork, Logo, ToggleThemeButton } from ".";

interface Props {
  isOpen: boolean;
  handleClick: () => void;
}

const MobileMenu = ({ isOpen, handleClick }: Props) => {
  return (
    <div className="md:hidden">
      {/* Hamburger menu */}
      <button
        className={`flex-col justify-center items-center flex py-8 cursor-default ${
          isOpen && "pointer-events-none"
        }`}
        onClick={!isOpen ? handleClick : undefined}
      >
        <span
          className={`bg-primary dark:bg-primaryDark block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        />
        <span
          className={`bg-primary dark:bg-primaryDark block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-primary dark:bg-primaryDark block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        />
      </button>
      {isOpen && (
        <CheckOutsideClick handleClick={handleClick}>
          <motion.div
            className="min-w-[70vw] flex-col items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-light dark:bg-dark rounded-xl backdrop-blur-md py-20 xs:py-32 text-light flex md:hidden shadow-lg ring-1 dark:ring-2 ring-primary dark:ring-secondaryDark focus:outline-none"
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center gap-x-8">
              <Logo />
              <ToggleThemeButton className="flex items-center justify-center rounded-full p-1 bg-primary dark:bg-primaryDark text-light dark:text-dark w-[1.65rem] h-[1.65rem] transition" />
            </div>
            <SelectNetwork className="mt-12" />
          </motion.div>
        </CheckOutsideClick>
      )}
    </div>
  );
};

export default MobileMenu;
