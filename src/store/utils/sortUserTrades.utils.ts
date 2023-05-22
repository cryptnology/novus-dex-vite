import { Contract, ethers } from "ethers";
import { decorateOrder } from ".";

const decorateUserTrade = (
  order: any,
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  account: string
) => {
  const usersOrder = order.creator === account;

  let orderType: string;

  if (usersOrder)
    orderType = order.tokenGive === tokens[1].token.address ? "buy" : "sell";
  else orderType = order.tokenGive === tokens[1].token.address ? "sell" : "buy";

  return { ...order, orderType };
};

const decorateUserTrades = (
  orders: (ethers.utils.Result | undefined)[],
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  account: string
) => {
  return orders.map((order) => {
    const decoratedOrder = decorateOrder(order, tokens);
    return decorateUserTrade(decoratedOrder, tokens, account);
  });
};

const sortUserTrades = (
  account: string,
  tokens: {
    token: Contract;
    symbol: string;
  }[],
  filledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }
) => {
  let orders: (ethers.utils.Result | undefined)[];

  orders = filledOrders.data?.filter(
    (o) => o?.user === account || o?.creator === account
  );

  orders = orders?.filter(
    (o) =>
      o?.tokenGet === tokens[1]?.token.address ||
      o?.tokenGive === tokens[1]?.token.address
  );

  // Sort orders by date descending to compare history
  orders = orders?.sort((a, b) => b?.timestamp - a?.timestamp);

  const decoratedUserTrades = decorateUserTrades(orders, tokens, account);

  return { trades: decoratedUserTrades };
};

export default sortUserTrades;
