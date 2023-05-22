import { RxCaretSort } from "react-icons/rx";
import { useExchangeStore, useTokensStore } from "../store";
import { sortTradeOrders } from "../store/utils";

const Trades = () => {
  const { contracts: tokens } = useTokensStore();
  const { filledOrders } = useExchangeStore();

  const { tradeOrders } = sortTradeOrders(filledOrders, tokens);

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5 h-[420px]">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Trades
      </h2>
      {tradeOrders.length > 0 ? (
        <div className="bg-light rounded-xl p-4 dark:bg-dark transition h-[340px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                <th>
                  <span className="flex">
                    Time
                    <RxCaretSort size={16} />
                  </span>
                </th>
                <th>
                  <span className="flex justify-end">
                    <RxCaretSort size={16} />
                    {tokens && tokens[0]?.symbol}
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
              </tr>
            </thead>
            <tbody>
              {tradeOrders.map((order) => (
                <tr key={order.id} className="text-sm">
                  <td>{order.formattedTimestamp}</td>
                  <td className="text-right">{order.token0Amount}</td>
                  <td
                    className={`${
                      order.tokenPriceClass === "higher"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-500"
                    } transition text-right`}
                  >
                    {order.tokenPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-light rounded-xl p-4 dark:bg-dark transition h-[340px]">
          <h3 className="font-semibold">No trades</h3>
        </div>
      )}
    </div>
  );
};

export default Trades;
