import { FormEvent, useState } from "react";
import { Tab } from "@headlessui/react";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { classNames } from "../../utils";
import {
  makeBuyOrder,
  makeSellOrder,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "../../store";

import OrderForm from "./OrderForm";

const Order = () => {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const { provider } = useUserStore();
  const { contract: exchange, setOrder } = useExchangeStore();
  const { contracts: tokens } = useTokensStore();

  const buyHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    makeBuyOrder(
      provider as Web3Provider,
      exchange as Contract,
      tokens,
      { amount, price },
      setOrder
    );
    setAmount("");
    setPrice("");
  };

  const sellHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    makeSellOrder(
      provider as Web3Provider,
      exchange as Contract,
      tokens,
      { amount, price },
      setOrder
    );
    setAmount("");
    setPrice("");
  };

  return (
    <div className="mb-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        New Order
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
            Buy
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
            Sell
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6 bg-light dark:bg-dark rounded-xl p-4 transition">
          <Tab.Panel>
            <OrderForm
              amount={amount}
              price={price}
              amountHandler={setAmount}
              priceHandler={setPrice}
              btnLabel="Buy Order"
              inputLabel="Buy"
              transactionHandler={buyHandler}
              disabled={tokens.length === 0}
            />
          </Tab.Panel>
          <Tab.Panel>
            <OrderForm
              amount={amount}
              price={price}
              amountHandler={setAmount}
              priceHandler={setPrice}
              btnLabel="Sell Order"
              inputLabel="Sell"
              transactionHandler={sellHandler}
              disabled={tokens.length === 0}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Order;
