import { ethers } from "ethers";
import { reject } from "lodash";

const openOrders = (
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
  return reject(allOrders.data, (order) => {
    const ordersFilled = filledOrders.data.some(
      (o) => o?.id.toString() === order?.id.toString()
    );
    const ordersCancelled = cancelledOrders.data.some(
      (o) => o?.id.toString() === order?.id.toString()
    );
    return ordersFilled || ordersCancelled;
  });
};

export default openOrders;
