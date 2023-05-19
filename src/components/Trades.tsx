import { RxCaretSort } from "react-icons/rx";
import { useExchangeStore, useTokensStore } from "../store";
import { sortTradeOrders } from "../store/utils";

const Trades = () => {
  const { contracts: tokens } = useTokensStore();
  const { filledOrders } = useExchangeStore();

  const { tradeOrders } = sortTradeOrders(filledOrders, tokens);

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Trades
      </h2>
      <div className="grid sm:flex gap-5">
        <table className="w-full text-left">
          {tradeOrders.length > 0 ? (
            <>
              <thead>
                <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                  <th>
                    <span className="flex">
                      Time
                      <RxCaretSort size={16} />
                    </span>
                  </th>
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
                </tr>
              </thead>
              <tbody>
                {tradeOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td>{order.formattedTimestamp}</td>
                    <td>{order.token0Amount}</td>
                    <td
                      className={`${
                        order.tokenPriceClass === "higher"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-500"
                      } transition`}
                    >
                      {order.tokenPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <caption className="mt-10">No trades</caption>
          )}
        </table>
      </div>
    </div>
  );
};

export default Trades;
