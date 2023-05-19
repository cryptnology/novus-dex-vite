import {
  useExchangeStore,
  useTokensStore,
  sortOrderBookOrders,
} from "../../store";

import OrderBookTable from "./OrderBookTable";

const OrderBook = () => {
  const { contracts: tokens } = useTokensStore();
  const { allOrders, cancelledOrders, filledOrders } = useExchangeStore();

  const { buyOrders, sellOrders } = sortOrderBookOrders(
    allOrders,
    tokens,
    cancelledOrders,
    filledOrders
  );

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl transition p-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Order Book
      </h2>
      <div className="grid sm:flex gap-5">
        <table className="w-full text-left">
          <caption className="text-left font-semibold mb-2">Selling</caption>
          <OrderBookTable
            orders={sellOrders}
            tokens={tokens}
            orderType="sell"
          />
        </table>
        <table className="w-full text-left">
          <caption className="text-left font-semibold mb-2">Buying</caption>
          <OrderBookTable orders={buyOrders} tokens={tokens} orderType="buy" />
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
