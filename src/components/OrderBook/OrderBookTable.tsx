import { Contract } from "ethers";
import { RxCaretSort } from "react-icons/rx";

interface Props {
  orders: any[];
  tokens: {
    token: Contract;
    symbol: string;
  }[];
  onClick: (id: number) => void;
}

const OrderBookTable = ({ orders, tokens, onClick }: Props) => {
  return (
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
            <span className="flex justify-end">
              <RxCaretSort size={16} />
              {`${tokens && tokens[0]?.symbol} / ${
                tokens && tokens[1]?.symbol
              }`}
            </span>
          </th>
          <th>
            <span className="flex justify-end">
              <RxCaretSort size={16} />
              {tokens && tokens[1]?.symbol}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            className="text-sm cursor-pointer hover:opacity-60 transition-opacity duration-300"
            key={order.id}
            onClick={() => onClick(Number(order.id))}
          >
            <td>{order.token0Amount}</td>
            <td className="text-right">{order.token1Amount}</td>
            <td
              className={`${
                order.orderType === "buy"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-500"
              } transition text-right`}
            >
              {order.tokenPrice}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default OrderBookTable;
