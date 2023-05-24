import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Tab } from "@headlessui/react";
import { FaEthereum } from "react-icons/fa";
import {
  loadBalances,
  transferTokens,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "../store";
import { Transaction } from "../constants";
import { classNames } from "../utils";

import { BalanceForm } from ".";

const Balance = () => {
  const [token1TransferAmount, setToken1TransferAmount] = useState("");
  const [token2TransferAmount, setToken2TransferAmount] = useState("");

  const { account, provider } = useUserStore();
  const {
    contracts: tokens,
    balances: tokenBalances,
    setTokenOneBalance,
    setTokenTwoBalance,
    setLoaded,
    transferInProgress,
    setTransfer,
  } = useTokensStore();
  const {
    contract: exchange,
    balances: exchangeTokenBalances,
    setTokenOneBalance: setExchangeTokenOneBalance,
    setTokenTwoBalance: setExchangeTokenTwoBalance,
    setLoaded: setExchangeLoaded,
  } = useExchangeStore();

  useEffect(() => {
    if (exchange && tokens[0] && tokens[1] && account)
      loadBalances(
        exchange as Contract,
        tokens,
        account,
        setTokenOneBalance,
        setTokenTwoBalance,
        setLoaded,
        setExchangeTokenOneBalance,
        setExchangeTokenTwoBalance,
        setExchangeLoaded
      );
  }, [
    account,
    exchange,
    setExchangeLoaded,
    setExchangeTokenOneBalance,
    setExchangeTokenTwoBalance,
    setLoaded,
    setTokenOneBalance,
    setTokenTwoBalance,
    tokens,
    transferInProgress,
  ]);

  const amountHandler = (e: ChangeEvent<HTMLInputElement>, token: Contract) => {
    const amount = e.target.value;

    if (token.address === tokens[0].token.address)
      setToken1TransferAmount(amount);
    else setToken2TransferAmount(amount);
  };

  const depositHandler = (e: FormEvent<HTMLFormElement>, token: Contract) => {
    e.preventDefault();

    if (token.address === tokens[0]?.token.address) {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        Transaction.Deposit,
        token,
        token1TransferAmount,
        setTransfer
      );
      setToken1TransferAmount("");
    } else {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        Transaction.Deposit,
        token,
        token2TransferAmount,
        setTransfer
      );
      setToken2TransferAmount("");
    }
  };

  const withdrawHandler = (e: FormEvent<HTMLFormElement>, token: Contract) => {
    e.preventDefault();

    if (token.address === tokens[0]?.token.address) {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        Transaction.Withdraw,
        token,
        token1TransferAmount,
        setTransfer
      );
      setToken1TransferAmount("");
    } else {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        Transaction.Withdraw,
        token,
        token2TransferAmount,
        setTransfer
      );
      setToken2TransferAmount("");
    }
  };

  return (
    <>
      <h2 className="font-bold mb-3 text-lg transition text-dark dark:text-light">
        Balance
      </h2>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-light dark:bg-dark p-1 font-bold">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-xl py-2.5 font-bold leading-5 text-dark",

                selected
                  ? "bg-primary text-light hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
                  : "dark:text-light border-[3px] border-transparent hover:border-primary dark:hover:border-primaryDark dark:hover:border-[3px] transition duration-300"
              )
            }
          >
            Deposit
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-xl py-2.5 font-bold leading-5 text-dark",
                selected
                  ? "bg-primary text-light hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
                  : "dark:text-light border-[3px] border-transparent hover:border-primary dark:hover:border-primaryDark dark:hover:border-[3px] transition duration-300"
              )
            }
          >
            Withdraw
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6 bg-light dark:bg-dark rounded-xl p-4 transition">
          <Tab.Panel>
            <BalanceForm
              token={tokens[0]?.token}
              tokenSymbol={tokens[0]?.symbol}
              icon={
                <img
                  className="object-contain mr-1"
                  src="/nov.png"
                  alt="NOV Logo"
                  width={16}
                  height={16}
                />
              }
              tokenBalance={tokenBalances[0]}
              exchangeTokenBalance={exchangeTokenBalances[0]}
              tokenTransferAmount={token1TransferAmount}
              transactionHandler={depositHandler}
              amountHandler={amountHandler}
              btnLabel="Deposit"
            />
            <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
            <BalanceForm
              token={tokens[1]?.token}
              tokenSymbol={tokens[1]?.symbol}
              icon={
                tokens[1]?.symbol === "mETH" ? (
                  <FaEthereum className="mr-1" size={14} />
                ) : (
                  <img
                    className="object-contain mr-1"
                    src="/dai.png"
                    alt="DAI Logo"
                    width={14}
                    height={14}
                  />
                )
              }
              tokenBalance={tokenBalances[1]}
              exchangeTokenBalance={exchangeTokenBalances[1]}
              tokenTransferAmount={token2TransferAmount}
              transactionHandler={depositHandler}
              amountHandler={amountHandler}
              btnLabel="Deposit"
            />
          </Tab.Panel>
          <Tab.Panel>
            <BalanceForm
              token={tokens[0]?.token}
              tokenSymbol={tokens[0]?.symbol}
              icon={
                <img
                  className="object-contain mr-1"
                  src="/nov.png"
                  alt="NOV Logo"
                  width={16}
                  height={16}
                />
              }
              tokenBalance={tokenBalances[0]}
              exchangeTokenBalance={exchangeTokenBalances[0]}
              tokenTransferAmount={token1TransferAmount}
              transactionHandler={withdrawHandler}
              amountHandler={amountHandler}
              btnLabel="Withdraw"
            />
            <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
            <BalanceForm
              token={tokens[1]?.token}
              tokenSymbol={tokens[1]?.symbol}
              icon={
                tokens[1]?.symbol === "mETH" ? (
                  <FaEthereum className="mr-1" size={14} />
                ) : (
                  <img
                    className="object-contain mr-1"
                    src="/dai.png"
                    alt="DAI Logo"
                    width={14}
                    height={14}
                  />
                )
              }
              tokenBalance={tokenBalances[1]}
              exchangeTokenBalance={exchangeTokenBalances[1]}
              tokenTransferAmount={token2TransferAmount}
              transactionHandler={withdrawHandler}
              amountHandler={amountHandler}
              btnLabel="Withdraw"
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Balance;
