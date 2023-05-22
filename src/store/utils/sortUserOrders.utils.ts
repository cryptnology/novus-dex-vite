import { Contract, ethers } from "ethers";
import { decorateOrder, openOrders } from ".";

const decorateUserOpenOrder = (
  order: any,
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  const orderType =
    order.tokenGive === tokens[1].token.address ? "buy" : "sell";

  return { ...order, orderType };
};

const decorateUserOpenOrders = (
  orders: (ethers.utils.Result | undefined)[],
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  return orders.map((order) => {
    const decoratedOrder = decorateOrder(order, tokens);
    return decorateUserOpenOrder(decoratedOrder, tokens);
  });
};

const sortUserOrders = (
  account: string,
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  allOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  },
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
    (o) => o?.user === account
  );

  orders = orders?.filter(
    (o) =>
      o?.tokenGet === tokens[1]?.token.address ||
      o?.tokenGive === tokens[1]?.token.address
  );

  const decoratedUserOpenOrders = decorateUserOpenOrders(orders, tokens);

  // Sort orders by date descending to compare history
  orders = decoratedUserOpenOrders.sort((a, b) => b?.timestamp - a?.timestamp);

  return { orders };
};

export default sortUserOrders;
