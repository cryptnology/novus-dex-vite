import { ChangeEvent, FormEvent, ReactNode } from "react";
import { Contract } from "ethers";
import { Button, Input } from ".";

interface Props {
  token: Contract;
  tokenSymbol: string;
  icon: ReactNode;
  tokenBalance: string;
  exchangeTokenBalance: string;
  tokenTransferAmount: string;
  btnLabel: string;
  transactionHandler: (e: FormEvent<HTMLFormElement>, token: Contract) => void;
  amountHandler: (e: ChangeEvent<HTMLInputElement>, token: Contract) => void;
}

const BalanceForm = ({
  token,
  tokenSymbol,
  icon,
  tokenBalance,
  exchangeTokenBalance,
  tokenTransferAmount,
  btnLabel,
  transactionHandler,
  amountHandler,
}: Props) => (
  <>
    <div className="flex justify-between">
      <div>
        <span className="text-sm font-semibold">Token</span>
        <br />
        <div className="flex items-center">
          {tokenSymbol && icon}
          {tokenSymbol}
        </div>
      </div>
      <p>
        <span className="text-sm font-semibold">Wallet</span>
        <br />
        {tokenBalance || "0.0"}
      </p>
      <p>
        <span className="text-sm font-semibold">Exchange</span>
        <br />
        {exchangeTokenBalance || "0.0"}
      </p>
    </div>
    <form className="mt-4" onSubmit={(e) => transactionHandler(e, token)}>
      <Input
        label={`${tokenSymbol || ""} Amount`}
        type="text"
        id="token1"
        placeholder="0.0000"
        value={tokenTransferAmount}
        onChange={(e) => amountHandler(e, token)}
      />
      <Button
        className="w-full mt-4"
        label={btnLabel}
        type="submit"
        disabled={!tokenSymbol}
      />
    </form>
  </>
);

export default BalanceForm;
