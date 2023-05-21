import { Contract, ethers } from "ethers";
import { get, groupBy, reject } from "lodash";

import { decorateOrder, openOrders } from ".";

const GREEN = "text-green-600";
const RED = "text-red-600";

const decorateOrderBookOrder = (
  order: any,
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  const buy = "buy";
  const sell = "sell";

  const orderType = order?.tokenGive === tokens[1].token.address ? buy : sell;

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === buy ? GREEN : RED,
    orderFillAction: orderType === buy ? sell : buy,
  };
};

const decorateOrderBookOrders = (
  orders: (ethers.utils.Result | undefined)[],
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  return orders.map((order) => {
    const decoratedOrder = decorateOrder(order, tokens);
    return decorateOrderBookOrder(decoratedOrder, tokens);
  });
};

const sortOrderBookOrders = (
  allOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  cancelledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
  filledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }
) => {
  let orders: (ethers.utils.Result | undefined)[];

  orders = openOrders(allOrders, cancelledOrders, filledOrders)?.filter(
    (o) =>
      o?.tokenGet === tokens[1]?.token.address ||
      o?.tokenGive === tokens[1]?.token.address
  );

  // Group by "ordrType"
  const groupedOrders = groupBy(
    decorateOrderBookOrders(orders, tokens),
    "orderType"
  );

  // Fetch buy and sell orders
  const buyOrders = get(groupedOrders, "buy", []);
  const sellOrders = get(groupedOrders, "sell", []);

  return {
    buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
    sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  };
};

export default sortOrderBookOrders;
