import { Contract } from "ethers";
import { RxCaretSort } from "react-icons/rx";

interface Props {
  orders: any[];
  tokens: {
    token: Contract;
    symbol: string;
  }[];
  orderType: "buy" | "sell";
}

const OrderBookTable = ({ orders, tokens, orderType }: Props) => {
  return (
    <>
      {orders.length > 0 ? (
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
            {orders.map((order) => (
              <tr key={order.id} className="text-sm">
                <td>{order.token0Amount}</td>
                <td>{order.token1Amount}</td>
                <td
                  className={`${
                    order.orderType === "buy"
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
        <caption className="mt-10">{`No ${orderType} orders`}</caption>
      )}
    </>
  );
};

export default OrderBookTable;
