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
  const { provider, account } = useUserStore();
  const {
    contracts: tokens,
    setTokenOneBalance,
    setTokenTwoBalance,
    setLoaded,
  } = useTokensStore();
  const {
    contract: exchange,
    allOrders,
    cancelledOrders,
    filledOrders,
    setOrder,
    setTokenOneBalance: setExchangeTokenOneBalance,
    setTokenTwoBalance: setExchangeTokenTowBalance,
    setLoaded: setExchangeLoaded,
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
      setOrder,
      tokens,
      account,
      setTokenOneBalance,
      setTokenTwoBalance,
      setLoaded,
      setExchangeTokenOneBalance,
      setExchangeTokenTowBalance,
      setExchangeLoaded
    );
  };

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-t-xl transition p-5 h-[380px]">
      <h2 className="font-bold mb-3 text-lg text-dark dark:text-light transition">
        Order Book
      </h2>
      <div className="grid sm:grid-cols-2 gap-10 sm:gap-8 md:gap-12 lg:gap-8 xl:gap-20 bg-light rounded-xl p-4 dark:bg-dark transition h-[280px] overflow-y-auto">
        {sellOrders.length > 0 ? (
          <div className="col-span-1">
            <table className="w-full text-left">
              <caption className="text-left font-semibold mb-2">
                Selling
              </caption>
              <OrderBookTable
                orders={sellOrders}
                tokens={tokens}
                onClick={fillOrderHandler}
              />
            </table>
          </div>
        ) : (
          <div className="h-full w-full">
            <h2 className="text-left font-semibold mb-2">Selling</h2>
            <div className="flex w-full justify-center items-center h-3/4 sm:h-[190px]">
              <h3 className="font-semibold">No sell orders</h3>
            </div>
          </div>
        )}
        {buyOrders.length > 0 ? (
          <div className="col-span-1">
            <table className="w-full text-left">
              <caption className="text-left font-semibold mb-2">Buying</caption>
              <OrderBookTable
                orders={buyOrders}
                tokens={tokens}
                onClick={fillOrderHandler}
              />
            </table>
          </div>
        ) : (
          <div className="h-full w-full">
            <h2 className="text-left font-semibold mb-2">Buying</h2>
            <div className="flex w-full justify-center items-center h-3/4 sm:h-[190px]">
              <h3 className="font-semibold">No buy orders</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;
