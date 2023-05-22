import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import {
  useExchangeStore,
  useTokensStore,
  sortOrderBookOrders,
  fillOrder,
  useUserStore,
} from "../../store";

import OrderBookTable from "./OrderBookTable";

const OrderBook = () => {
  const { provider } = useUserStore();
  const { contracts: tokens } = useTokensStore();
  const {
    contract: exchange,
    allOrders,
    cancelledOrders,
    filledOrders,
    setOrder,
  } = useExchangeStore();

  const { buyOrders, sellOrders } = sortOrderBookOrders(
    allOrders,
    tokens,
    cancelledOrders,
    filledOrders
  );
  const fillOrderHandler = (orderId: number) => {
    fillOrder(
      provider as Web3Provider,
      exchange as Contract,
      orderId,
      setOrder
    );
  };

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-t-xl transition p-5">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Order Book
      </h2>
      <div className="grid sm:flex gap-5">
        {sellOrders.length > 0 ? (
          <table className="w-full">
            <caption className="text-left font-semibold mb-2">Selling</caption>
            <OrderBookTable
              orders={sellOrders}
              tokens={tokens}
              onClick={fillOrderHandler}
            />
          </table>
        ) : (
          <div className="h-full w-full">
            <h2 className="text-left font-semibold mb-2">Selling</h2>
            <div className="flex w-full justify-center items-center">
              <h3 className="font-semibold">No sell orders</h3>
            </div>
          </div>
        )}
        <div className="hidden sm:inline-block xl:mx-4" />
        <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-6 mb-4 sm:hidden" />
        {buyOrders.length > 0 ? (
          <table className="w-full text-left">
            <caption className="text-left font-semibold mb-2">Buying</caption>
            <OrderBookTable
              orders={buyOrders}
              tokens={tokens}
              onClick={fillOrderHandler}
            />
          </table>
        ) : (
          <div className="h-full w-full">
            <h2 className="text-left font-semibold mb-2">Buying</h2>
            <div className="flex w-full justify-center items-center">
              <h3 className="font-semibold">No buy orders</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;
