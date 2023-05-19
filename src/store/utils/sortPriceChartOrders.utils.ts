import { Contract, ethers } from "ethers";
import { get, groupBy, maxBy, minBy } from "lodash";
import moment from "moment";

import { decorateOrder } from ".";

const buildGraphData = (orders: any) => {
  // Group by "timestamp"
  const groupedOrders = groupBy(orders, (order) =>
    // @ts-ignore
    moment.unix(order?.timestamp).startOf("hour").format()
  );

  // Get each hour where data exists
  const hours = Object.keys(groupedOrders);

  // Build the graph series
  return hours.map((hour) => {
    // Fetch all orders from current hour
    const group = groupedOrders[hour];

    // Calculate price values: open, high, low, close
    const open = group[0]; // First order
    const high = maxBy(group, "tokenPrice"); // High price
    const low = minBy(group, "tokenPrice"); // Low price
    const close = group[group.length - 1]; // Last order

    return {
      x: new Date(hour),
      y: [
        open?.tokenPrice,
        high?.tokenPrice,
        low?.tokenPrice,
        close?.tokenPrice,
      ],
    };
  });
};

const sortPriceChartOrders = (
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

  // Decorate orders - add display attributes
  const decoratedOrders = orders.map((order) => decorateOrder(order, tokens));

  // Get last 2 orders for final price & price change
  const [secondLastOrder, lastOrder] = decoratedOrders.slice(
    decoratedOrders.length - 2,
    decoratedOrders.length
  );

  const lastPrice = get(lastOrder, "tokenPrice", 0);

  const secondLastPrice = get(secondLastOrder, "tokenPrice", 0);

  return {
    lastPrice,
    lastPriceChange: lastPrice >= secondLastPrice ? "+" : "-",
    series: [
      {
        data: buildGraphData(decoratedOrders),
      },
    ],
  };
};

export default sortPriceChartOrders;
