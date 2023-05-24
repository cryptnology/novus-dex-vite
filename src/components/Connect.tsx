import Blockies from "react-blockies";
import { useUserStore, loadAccount } from "../store";
import { Wallet } from "../icons";

import config from "../store/networkConfig.json";
import { Button } from ".";

interface Props {
  className?: string;
}

const Connect = ({ className }: Props) => {
  const { provider, account, balance, chainId, setAccount, setBalance } =
    useUserStore();

  return (
    <div
      className={`bg-secondary dark:bg-secondaryDark h-[46px] ${
        account ? "px-6" : "pl-6"
      } flex items-center rounded-xl transition ${className}`}
    >
      <div className="pr-4 text-dark dark:text-light flex items-center transition">
        <Wallet className="w-6" />
        <span className="ml-3 text-sm">
          {balance ? Number(balance).toFixed(4) : "0.0"}
          <span className="ml-1 font-bold">ETH</span>
        </span>
      </div>
      {account ? (
        <a
          className="flex items-center text-sm transition"
          href={
            // @ts-ignore
            config[chainId]
              ? // @ts-ignore
                `${config[chainId].explorerURL}/address/${account}`
              : `#`
          }
          target="_blank"
        >
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
          <Blockies
            seed={account}
            size={10}
            scale={2.5}
            color="#2187D0"
            bgColor="#F1F2F9"
            spotColor="#767F92"
            className="ml-4 rounded-full"
          />
        </a>
      ) : (
        <Button
          label="Connect"
          // @ts-ignore
          onClick={() => loadAccount(provider, setAccount, setBalance)}
        />
      )}
    </div>
  );
};

export default Connect;
