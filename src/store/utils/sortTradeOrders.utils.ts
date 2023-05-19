import { Contract, ethers } from "ethers";

import { decorateOrder } from ".";

const decorateFilledOrders = (
  orders: (ethers.utils.Result | undefined)[],
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  let previousOrder = orders[0];

  return orders.map((order: ethers.utils.Result | undefined) => {
    const decoratedOrder = decorateOrder(order, tokens);
    const decoratedFilledOrder = decorateFilledOrder(
      decoratedOrder,
      previousOrder
    );
    previousOrder = decoratedFilledOrder;
    return decoratedFilledOrder;
  });
};

const decorateFilledOrder = (
  order: any,
  previousOrder: ethers.utils.Result | undefined
) => {
  return {
    ...order,
    tokenPriceClass: tokenPriceClass(
      order?.tokenPrice,
      order?.id,
      previousOrder
    ),
  };
};

const tokenPriceClass = (
  tokenPrice: number,
  orderId: number,
  previousOrder: ethers.utils.Result | undefined
) => {
  if (previousOrder?.id === orderId) return "higher";

  if (previousOrder?.tokenPrice <= tokenPrice) return "higher";
  else return "lower";
};

const sortTradeOrders = (
  filledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  let orders: (ethers.utils.Result | undefined)[];

  orders = filledOrders.data?.filter(
    (o) =>
      o?.tokenGet === tokens[0]?.token.address ||
      o?.tokenGet === tokens[1]?.token.address
  );

  orders = filledOrders.data?.filter(
    (o) =>
      o?.tokenGive === tokens[0]?.token.address ||
      o?.tokenGive === tokens[1]?.token.address
  );

  // Sort orders by date ascending to compare history
  orders = orders.sort((a, b) => a?.timestamp - b?.timestamp);

  const decoratedFilledOrders = decorateFilledOrders(orders, tokens);

  // Sort orders by date descending to compare history
  const sortedOrders = decoratedFilledOrders.sort(
    (a: { timestamp: number }, b: { timestamp: number }) =>
      b?.timestamp - a?.timestamp
  );

  return { tradeOrders: sortedOrders };
};

export default sortTradeOrders;
