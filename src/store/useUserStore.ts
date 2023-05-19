import { create } from "zustand";
import { providers } from "ethers";

interface UserStore {
  provider: providers.Web3Provider | {};
  chainId: number | null;
  account: string | "";
  balance: string | "";
  setProvider: (provider: providers.Web3Provider) => void;
  setChainId: (chainId: number) => void;
  setAccount: (account: string) => void;
  setBalance: (balance: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  provider: {},
  chainId: null,
  account: "",
  balance: "",
  setProvider: (provider) => set(() => ({ provider })),
  setChainId: (chainId) => set(() => ({ chainId })),
  setAccount: (account) => set(() => ({ account })),
  setBalance: (balance) => set(() => ({ balance })),
}));

export default useUserStore;
