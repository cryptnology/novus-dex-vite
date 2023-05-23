import { Contract, Event, ethers, providers } from "ethers";

import TOKEN from "../blockchain/artifacts/src/blockchain/contracts/Token.sol/Token.json";
import EXCHANGE from "../blockchain/artifacts/src/blockchain/contracts/Exchange.sol/Exchange.json";
import { Transaction as TransactionType } from "../store/useTokensStore";
import { Transaction as OrderType } from "../store/useExchangeStore";
import { Transaction } from "../constants";

export const loadProvider = (
  setProvider: (provider: providers.Web3Provider) => void
) => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(provider);

  return provider;
};

export const loadNetwork = async (
  provider: providers.Web3Provider,
  setChainId: (chainId: number) => void
) => {
  const { chainId } = await provider.getNetwork();
  setChainId(chainId);

  return chainId;
};

export const loadAccount = async (
  provider: providers.Web3Provider,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void
) => {
  // @ts-ignore
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  setAccount(account);

  const balance = await provider.getBalance(account);
  const formattedBalance = ethers.utils.formatEther(balance);
  setBalance(formattedBalance);

  return { account, balance };
};

export const loadTokens = async (
  provider: providers.Web3Provider,
  addresses: string[],
  setContracts: (contracts: { token: Contract; symbol: string }[]) => void,
  setLoaded: (loaded: boolean) => void
) => {
  const tokens = [];

  if (addresses.length) {
    for (let i = 0; i < addresses.length; i++) {
      const token = new ethers.Contract(addresses[i], TOKEN.abi, provider);
      const symbol: string = await token.symbol();

      tokens.push({ token, symbol });
    }
  }
  setContracts(tokens);
  setLoaded(true);

  return tokens;
};

export const loadExchange = async (
  provider: providers.Web3Provider,
  address: string,
  setContract: (contract: Contract) => void,
  setLoaded: (loaded: boolean) => void
) => {
  const exchange = new ethers.Contract(address, EXCHANGE.abi, provider);

  setContract(exchange);
  setLoaded(true);

  return exchange;
};

export const subscribeToEvents = (
  exchange: Contract,
  setTransfer: (
    transaction: TransactionType,
    transferInProgress: boolean
  ) => void,
  setOrder: (order: OrderType, orderInProgress: boolean) => void,
  setTokenEvents: (events: Event[]) => void,
  setExchangeEvents: (event: Event[]) => void,
  provider: providers.Web3Provider,
  setAllOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setCancelledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setFilledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void
) => {
  exchange.on(Transaction.Cancel, () => {
    setOrder(
      {
        transactionType: Transaction.Cancel,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
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
    loadAccount(provider, setAccount, setBalance);
  });

  exchange.on(Transaction.Trade, () => {
    setOrder(
      {
        transactionType: Transaction.Trade,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
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
    loadAccount(provider, setAccount, setBalance);
  });

  exchange.on(Transaction.Deposit, () => {
    setTransfer(
      {
        transactionType: Transaction.Deposit,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
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
    loadAccount(provider, setAccount, setBalance);
  });

  exchange.on(Transaction.Withdraw, () => {
    setTransfer(
      {
        transactionType: Transaction.Withdraw,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
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
    loadAccount(provider, setAccount, setBalance);
  });

  exchange.on(Transaction.Order, () => {
    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
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
    loadAccount(provider, setAccount, setBalance);
  });
};

// ---------------------------------------------------------------------
// LOAD USER BALANCES (WALLET & EXCHANGE BALANCES)

export const loadBalances = async (
  exchange: Contract,
  tokens: { token: Contract; symbol: string }[],
  account: string,
  setTokenOneBalance: (balance: string) => void,
  setTokenTwoBalance: (balance: string) => void,
  setLoaded: (loaded: boolean) => void,
  setExchangeTokenOneBalance: (balance: string) => void,
  setExchangeTokenTwoBalance: (balance: string) => void,
  setExchangeLoaded: (loaded: boolean) => void
) => {
  // Tokens
  let balance = ethers.utils.formatUnits(
    await tokens[0].token.balanceOf(account),
    18
  );

  setLoaded(false);
  setTokenOneBalance(balance);
  setLoaded(true);

  balance = ethers.utils.formatUnits(
    await tokens[1].token.balanceOf(account),
    18
  );
  setLoaded(false);
  setTokenTwoBalance(balance);
  setLoaded(true);

  // Exchange
  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[0].token.address, account),
    18
  );

  setExchangeLoaded(false);
  setExchangeTokenOneBalance(balance);
  setExchangeLoaded(true);

  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[1].token.address, account),
    18
  );

  setExchangeLoaded(false);
  setExchangeTokenTwoBalance(balance);
  setExchangeLoaded(true);
};

// ---------------------------------------------------------------------
// LOAD ALL ORDERS

export const loadAllOrders = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  setAllOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setCancelledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setFilledOrders: (order: {
    loaded: boolean;
    data: (ethers.utils.Result | undefined)[];
  }) => void,
  setTokenEvents: (events: Event[]) => void,
  setExchangeEvents: (event: Event[]) => void
) => {
  const block = await provider.getBlockNumber();

  // Fetch deposits
  const depositStream = await exchange.queryFilter(
    Transaction.Deposit,
    0,
    block
  );

  // Fetch withdraws
  const withdrawStream = await exchange.queryFilter(
    Transaction.Withdraw,
    0,
    block
  );

  setTokenEvents([...depositStream, ...withdrawStream]);

  // Fetch cancelled orders
  const cancelStream = await exchange.queryFilter(Transaction.Cancel, 0, block);
  const cancelledOrders = cancelStream.map((event) => event.args);

  setCancelledOrders({ loaded: true, data: cancelledOrders });

  // Fetch filled orders
  const tradeStream = await exchange.queryFilter(Transaction.Trade, 0, block);
  const filledOrders = tradeStream.map((event) => event.args);

  setFilledOrders({ loaded: true, data: filledOrders });

  // Fetch all orders
  const orderStream = await exchange.queryFilter(Transaction.Order, 0, block);
  const allOrders = orderStream.map((event) => event.args);

  setExchangeEvents([...cancelStream, ...tradeStream, ...orderStream]);

  setAllOrders({ loaded: true, data: allOrders });
};

// ---------------------------------------------------------------------
// TRANSFER TOKENS (DEPOSIT & WITHDRAWS)

export const transferTokens = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  transactionType: Transaction.Deposit | Transaction.Withdraw,
  token: Contract,
  amount: string,
  setTransfer: (
    transaction: TransactionType,
    transferInProgress: boolean
  ) => void
) => {
  let transaction;

  try {
    const signer = provider.getSigner();
    const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

    setTransfer(
      {
        transactionType,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    transaction = await token
      .connect(signer)
      .approve(exchange.address, amountToTransfer);

    await transaction.wait();

    if (transactionType === Transaction.Deposit)
      transaction = await exchange
        .connect(signer)
        .depositToken(token.address, amountToTransfer);
    else
      transaction = await exchange
        .connect(signer)
        .withdrawToken(token.address, amountToTransfer);

    await transaction.wait();

    setTransfer(
      {
        transactionType,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setTransfer(
      {
        transactionType,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};

// ---------------------------------------------------------------------
// ORDERS (BUY & SELL)

export const makeBuyOrder = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  tokens: { token: Contract; symbol: string }[],
  order: { amount: string; price: string },
  setOrder: (order: OrderType, orderInProgress: boolean) => void
) => {
  const tokenGet = tokens[0].token.address;
  const amountGet = ethers.utils.parseUnits(order.amount, 18);
  const tokenGive = tokens[1].token.address;
  const amountGive = ethers.utils.parseUnits(
    (Number(order.amount) * Number(order.price)).toString(),
    18
  );

  try {
    const signer = provider.getSigner();
    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    const transaction = await exchange
      .connect(signer)
      .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();

    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};

export const makeSellOrder = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  tokens: { token: Contract; symbol: string }[],
  order: { amount: string; price: string },
  setOrder: (order: OrderType, orderInProgress: boolean) => void
) => {
  const tokenGet = tokens[1].token.address;
  const amountGet = ethers.utils.parseUnits(
    (Number(order.amount) * Number(order.price)).toString(),
    18
  );
  const tokenGive = tokens[0].token.address;
  const amountGive = ethers.utils.parseUnits(order.amount, 18);

  try {
    const signer = provider.getSigner();
    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    const transaction = await exchange
      .connect(signer)
      .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();

    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setOrder(
      {
        transactionType: Transaction.NewOrder,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};

// ---------------------------------------------------------------------
// CANCEL ORDER

export const cancelOrder = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  orderId: number,
  setOrder: (order: OrderType, orderInProgress: boolean) => void
) => {
  try {
    const signer = provider.getSigner();
    setOrder(
      {
        transactionType: Transaction.Cancel,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    const transaction = await exchange.connect(signer).cancelOrder(orderId);
    await transaction.wait();

    setOrder(
      {
        transactionType: Transaction.Cancel,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setOrder(
      {
        transactionType: Transaction.Cancel,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};

// ---------------------------------------------------------------------
// FILL ORDER

export const fillOrder = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  orderId: number,
  setOrder: (order: OrderType, orderInProgress: boolean) => void
) => {
  try {
    const signer = provider.getSigner();
    setOrder(
      {
        transactionType: Transaction.Trade,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    const transaction = await exchange.connect(signer).fillOrder(orderId);
    await transaction.wait();

    setOrder(
      {
        transactionType: Transaction.Trade,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setOrder(
      {
        transactionType: Transaction.Trade,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};
