import { RxCaretSort } from "react-icons/rx";
import { Tab } from "@headlessui/react";
import { sortUserTransactions } from "../store/utils";
import { useExchangeStore, useTokensStore, useUserStore } from "../store";
import { classNames } from "../utils";
import { Banner } from ".";

const Transactions = () => {
  const { account } = useUserStore();
  const { contracts: tokens } = useTokensStore();
  const { allOrders, filledOrders, cancelledOrders } = useExchangeStore();

  const { orders } = sortUserTransactions(
    account,
    tokens,
    allOrders,
    cancelledOrders,
    filledOrders
  );

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      {account ? (
        <>
          <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
            My Transactions
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
                Orders
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
                Trades
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-6 bg-light dark:bg-dark rounded-xl p-4 transition">
              <Tab.Panel>
                <div className="grid sm:flex gap-5">
                  <table className="w-full text-left">
                    {orders?.length > 0 ? (
                      <>
                        <thead>
                          <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                            <th>
                              <span className="flex">
                                {tokens && tokens[0]?.symbol}
                                <RxCaretSort size={16} />
                              </span>
                            </th>
                            <th>
                              <span className="flex">
                                {`${tokens && tokens[0]?.symbol} / ${
                                  tokens && tokens[1]?.symbol
                                }`}
                                <RxCaretSort size={16} />
                              </span>
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.map((order) => (
                            <tr key={order?.id} className="text-sm">
                              <td>{order?.token0Amount}</td>
                              <td
                                className={`${
                                  order?.orderType === "buy"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-500"
                                } transition`}
                              >
                                {order?.tokenPrice}
                              </td>
                              <td>Cancel</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <caption className="mt-10">No orders</caption>
                    )}
                  </table>
                </div>
              </Tab.Panel>
              <Tab.Panel>Trades</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : (
        <Banner className="text-lg" />
      )}
    </div>
  );
};

export default Transactions;
