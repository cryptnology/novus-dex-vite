import { RxCaretSort } from "react-icons/rx";
import { sortUserTransactions } from "../store/utils";
import { useExchangeStore, useTokensStore, useUserStore } from "../store";

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

  console.log(orders);

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        My Transactions
      </h2>
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
    </div>
  );
};

export default Transactions;
