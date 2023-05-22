import { create } from "zustand";
import { Contract, Event, ethers } from "ethers";

import { Transaction as TransactionConst } from "../constants";

export interface Transaction {
  transactionType:
    | TransactionConst.NewOrder
    | TransactionConst.Cancel
    | TransactionConst.Trade;
  isPending: boolean;
  isSuccessful: boolean;
  isError: boolean;
}

interface ExchangeStore {
  loaded: boolean;
  contract: Contract | {};
  balances: string[];
  transaction: Transaction | {};
  orderInProgress: boolean;
  events: Event[];
  allOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  };
  cancelledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  };
  filledOrders: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  };
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
  setTokenOneBalance: (balance: string) => void;
  setTokenTwoBalance: (balance: string) => void;
  setOrder: (transaction: Transaction, orderInProgress: boolean) => void;
  setEvent: (event: Event) => void;
  setAllOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void;
  setCancelledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void;
  setFilledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void;
}

const useExhangeStore = create<ExchangeStore>((set) => ({
  loaded: false,
  contract: {},
  balances: [],
  transaction: {},
  orderInProgress: false,
  events: [],
  allOrders: {
    loaded: false,
    data: [],
  },
  cancelledOrders: {
    loaded: false,
    data: [],
  },
  filledOrders: {
    loaded: false,
    data: [],
  },
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
  setTokenOneBalance: (balance) => set(() => ({ balances: [balance] })),
  setTokenTwoBalance: (balance) =>
    set((store) => ({ balances: [...store.balances, balance] })),
  setOrder: (transaction, orderInProgress) =>
    set(() => ({
      transaction,
      orderInProgress,
    })),
  setEvent: (event) => set((store) => ({ events: [...store.events, event] })),
  setAllOrders: (order) =>
    set((store) => ({
      allOrders: { ...store.allOrders, loaded: order.loaded, data: order.data },
    })),
  setCancelledOrders: (order) =>
    set((store) => ({
      cancelledOrders: {
        ...store.allOrders,
        loaded: order.loaded,
        data: order.data,
      },
    })),
  setFilledOrders: (order) =>
    set((store) => ({
      filledOrders: {
        ...store.allOrders,
        loaded: order.loaded,
        data: order.data,
      },
    })),
}));

export default useExhangeStore;
