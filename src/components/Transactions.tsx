import { useState } from "react";
import { RxCaretSort } from "react-icons/rx";
import { Tab } from "@headlessui/react";
import { sortUserOrders, sortUserTrades } from "../store/utils";
import { useExchangeStore, useTokensStore, useUserStore } from "../store";
import { classNames } from "../utils";
import { Banner } from ".";

const Transactions = () => {
  const [title, setTitle] = useState("Orders");

  const { account } = useUserStore();
  const { contracts: tokens } = useTokensStore();
  const { allOrders, filledOrders, cancelledOrders } = useExchangeStore();

  const { orders } = sortUserOrders(
    account,
    tokens,
    allOrders,
    cancelledOrders,
    filledOrders
  );
  const { trades } = sortUserTrades(account, tokens, filledOrders);

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      {account ? (
        <>
          <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
            My {title}
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
                onClick={() => setTitle("Orders")}
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
                onClick={() => setTitle("Transactions")}
              >
                Trades
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-6 bg-light dark:bg-dark rounded-xl p-4 transition">
              <Tab.Panel>
                {orders?.length > 0 ? (
                  <div className="grid sm:flex gap-5">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                          <th>
                            <span className="flex">
                              {tokens && tokens[0]?.symbol}
                              <RxCaretSort size={16} />
                            </span>
                          </th>
                          <th>
                            <span className="flex justify-end">
                              <RxCaretSort size={16} />
                              {`${tokens && tokens[0]?.symbol} / ${
                                tokens && tokens[1]?.symbol
                              }`}
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
                              } transition text-right`}
                            >
                              {order?.tokenPrice}
                            </td>
                            <td className="text-right">
                              <button
                                className="px-5 py-2 text-light text-xs font-bold bg-primary rounded-xl hover:bg-light hover:text-dark border border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
                                onClick={() => {}}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <h3 className="font-semibold">No open orders</h3>
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel>
                {trades?.length > 0 ? (
                  <div className="grid sm:flex gap-5">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                          <th>
                            <span className="flex">
                              Time
                              <RxCaretSort size={16} />
                            </span>
                          </th>
                          <th className="text-right">
                            <span className="flex justify-end">
                              <RxCaretSort size={16} />
                              {`${tokens && tokens[0]?.symbol}`}
                            </span>
                          </th>
                          <th className="text-right">
                            <span className="flex justify-end">
                              <RxCaretSort size={16} />
                              {`${tokens && tokens[0]?.symbol} / ${
                                tokens && tokens[1]?.symbol
                              }`}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {trades?.map((order) => (
                          <tr key={order?.id} className="text-sm">
                            <td>{order?.formattedTimestamp}</td>
                            <td
                              className={`${
                                order?.orderType === "buy"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-500"
                              } transition text-right`}
                            >
                              {order?.orderType === "buy" ? "+" : "-"}
                              {order?.token0Amount}
                            </td>
                            <td className="text-right">{order?.tokenPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <h3 className="font-semibold">No trades</h3>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : (
        <Banner title="Please connect to MetaMask" className="text-lg" />
      )}
    </div>
  );
};

export default Transactions;
