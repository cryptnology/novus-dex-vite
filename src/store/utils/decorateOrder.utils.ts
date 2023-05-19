import { Contract, ethers } from "ethers";
import moment from "moment";

const decorateOrder = (
  order: ethers.utils.Result | undefined,
  tokens: {
    token: Contract;
    symbol: string;
  }[]
) => {
  const ether = "ether";

  let token0Amount: string, token1Amount: string;

  if (order?.tokenGive === tokens[1]?.token?.address) {
    token0Amount = order.amountGive;
    token1Amount = order.amountGet;
  } else {
    token0Amount = order?.amountGet;
    token1Amount = order?.amountGive;
  }

  const precision = 100000;
  const tokenPrice =
    Math.round((Number(token1Amount) / Number(token0Amount)) * precision) /
    precision;

  return {
    ...order,
    token0Amount: ethers.utils.formatUnits(token0Amount, ether),
    token1Amount: ethers.utils.formatUnits(token1Amount, ether),
    tokenPrice,
    formattedTimetamp: moment.unix(order?.timestamp).format("h:mm:ssa d MMM D"),
  };
};

export default decorateOrder;
