"use client";

import { useEffect } from "react";
import {
  Balance,
  Container,
  Transactions,
  Order,
  OrderBook,
  PriceChart,
  SelectMarket,
  Trades,
  Alert,
} from "../src/components";
import {
  loadAccount,
  loadAllOrders,
  loadExchange,
  loadNetwork,
  loadProvider,
  loadTokens,
  subscribeToEvents,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "../src/store";
import config from "../src/store/networkConfig.json";

const App = () => {
  const { setProvider, setChainId, setAccount, setBalance } = useUserStore();
  const {
    setContracts: setTokens,
    setLoaded: setTokensLoaded,
    setTransfer,
    setEvents: setTokenEvents,
  } = useTokensStore();
  const {
    setContract: setExchange,
    setLoaded: setExchangeLoaded,
    setOrder,
    setEvents: setExchangeEvents,
    setAllOrders,
    setCancelledOrders,
    setFilledOrders,
  } = useExchangeStore();

  const loadBlockchainData = async () => {
    const provider = loadProvider(setProvider);
    const chainId = await loadNetwork(provider, setChainId);

    // Reload page when network changes
    // @ts-ignore
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    // @ts-ignore
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, setAccount, setBalance);
    });

    // Load token smart contracts
    // @ts-ignore
    const novus = config[chainId].novus;
    // @ts-ignore
    const mETH = config[chainId].mETH;
    loadTokens(
      provider,
      [novus.address, mETH.address],
      setTokens,
      setTokensLoaded
    );

    // Load exchange smart contract
    // @ts-ignore
    const exchangeConfig = config[chainId].exchange;
    const exchange = await loadExchange(
      provider,
      exchangeConfig.address,
      setExchange,
      setExchangeLoaded
    );

    loadAllOrders(
      provider,
      exchange,
      setAllOrders,
      setCancelledOrders,
      setFilledOrders,
      setTokenEvents,
      setExchangeEvents
    );

    subscribeToEvents(
      exchange,
      setTransfer,
      setOrder,
      setTokenEvents,
      setExchangeEvents,
      provider,
      setAllOrders,
      setCancelledOrders,
      setFilledOrders,
      setAccount,
      setBalance
    );
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container className="bg-light dark:bg-dark">
      <main className="pt-32 grid gap-4 grid-cols-1 lg:grid-cols-12 bg-light dark:bg-dark">
        <div className="lg:col-span-5 xl:col-span-4 bg-secondary dark:bg-secondaryDark rounded-xl xl:rounded-b-none xl:rounded-t-xl p-5 lg:max-h-[1290px] xl:h-full">
          <SelectMarket />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8 lg:mt-12 lg:mb-10 xl:mt-10 xl:mb-8" />
          <Balance />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8 lg:mt-16 lg:mb-12 xl:mt-10 xl:mb-8" />
          <Order />
        </div>
        <div className="lg:col-span-7 xl:col-span-8 grid gap-4 h-full">
          <PriceChart />
          <div className="grid gap-4 xl:grid-cols-2">
            <Transactions />
            <Trades />
          </div>
          <OrderBook />
        </div>
      </main>
      <Alert />
    </Container>
  );
};

export default App;
