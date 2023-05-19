import { RxCaretSort } from "react-icons/rx";
import { useTokensStore } from "../store";

const Trades = () => {
  const { contracts: tokens } = useTokensStore();

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Trades
      </h2>
      <div className="grid sm:flex gap-5">
        <table className="w-full text-left">
          {/* <caption className="text-left font-semibold mb-2">Selling</caption> */}
          {true ? (
            <>
              <thead>
                <tr className="text-xs opacity-50 text-dark dark:text-light transition">
                  <th className="">
                    <span className="flex">
                      {tokens && tokens[0]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {`${tokens && tokens[0]?.symbol} / ${
                        tokens && tokens[1]?.symbol
                      }`}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                  <th>
                    <span className="flex">
                      {tokens && tokens[1]?.symbol}
                      <RxCaretSort className="" size={16} />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {sellOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td>{order.token0Amount}</td>
                    <td>{order.token1Amount}</td>
                    <td className="text-red-600 dark:text-red-500 transition">
                      {order.tokenPrice}
                    </td>
                  </tr>
                ))} */}
                <tr className="text-sm">
                  <td>date</td>
                  <td>token amount</td>
                  <td className="text-red-600 dark:text-red-500 transition">
                    token price
                  </td>
                </tr>
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
