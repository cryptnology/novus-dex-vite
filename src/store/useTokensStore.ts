import { create } from "zustand";
import { Contract, Event } from "ethers";

import { Transaction as TransactionConst } from "../constants";

export interface Transaction {
  transactionType: TransactionConst.Deposit | TransactionConst.Withdraw;
  isPending: boolean;
  isSuccessful: boolean;
  isError: boolean;
}

interface TokensStore {
  loaded: boolean;
  contracts: { token: Contract; symbol: string }[];
  balances: string[];
  transaction: Transaction | {};
  transferInProgress: boolean;
  events: Event[];
  setLoaded: (loaded: boolean) => void;
  setContracts: (contracts: { token: Contract; symbol: string }[]) => void;
  setTokenOneBalance: (balance: string) => void;
  setTokenTwoBalance: (balance: string) => void;
  setTransfer: (transaction: Transaction, transferInProgress: boolean) => void;
  setEvents: (events: Event[]) => void;
}

const useTokensStore = create<TokensStore>((set) => ({
  loaded: false,
  contracts: [],
  balances: [],
  transaction: {},
  transferInProgress: false,
  events: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContracts: (contracts) => set(() => ({ contracts })),
  setTokenOneBalance: (balance) => set(() => ({ balances: [balance] })),
  setTokenTwoBalance: (balance) =>
    set((store) => ({ balances: [...store.balances, balance] })),
  setTransfer: (transaction, transferInProgress) =>
    set(() => ({
      transaction,
      transferInProgress,
    })),
  setEvents: (events) => set(() => ({ events })),
}));

export default useTokensStore;
