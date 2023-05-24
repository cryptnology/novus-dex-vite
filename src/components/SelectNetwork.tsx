import { useTokensStore, useUserStore } from "../store";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { SlHome } from "react-icons/sl";
import { FaEthereum } from "react-icons/fa";

interface Props {
  className?: string;
}

const SelectNetwork = ({ className }: Props) => {
  const { chainId } = useUserStore();
  const { contracts: tokens } = useTokensStore();

  const networkHandler = async (chainId: string) => {
    // @ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  };

  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center px-4 py-2 text-light font-bold bg-primary rounded-xl hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300">
            {chainId && chainId === 31337 && "Localhost"}
            {chainId && chainId === 5 && "Goerli"}
            {chainId && tokens.length === 0 && "Choose another network"}
            <HiOutlineChevronDown className="ml-2" size={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-40 rounded-xl bg-light dark:bg-primaryDark shadow-lg ring-1 dark:ring-2 ring-primary dark:ring-secondaryDark focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-primary dark:bg-secondaryDark text-light"
                        : "text-dark"
                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                    onClick={() => networkHandler("0x7A69")}
                  >
                    <SlHome className="mr-2" size={12} />
                    Localhost
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-primary dark:bg-secondaryDark text-light"
                        : "text-dark"
                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                    onClick={() => networkHandler("0x5")}
                  >
                    <FaEthereum className="mr-2" />
                    Goerli
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SelectNetwork;
