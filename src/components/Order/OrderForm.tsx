import { Dispatch, FormEvent, SetStateAction } from "react";

import { Button, Input } from "..";

interface Props {
  amount: string;
  price: string;
  inputLabel: string;
  btnLabel: string;
  transactionHandler: (e: FormEvent<HTMLFormElement>) => void;
  amountHandler: Dispatch<SetStateAction<string>>;
  priceHandler: Dispatch<SetStateAction<string>>;
}

const OrderForm = ({
  amount,
  price,
  btnLabel,
  amountHandler,
  priceHandler,
  transactionHandler,
  inputLabel,
}: Props) => {
  return (
    <div className="">
      <form onSubmit={transactionHandler}>
        <Input
          className="mb-2"
          label={`${inputLabel} Amount`}
          type="text"
          id="amount"
          placeholder="0.0000"
          value={amount}
          onChange={(e) => amountHandler(e.target.value)}
        />
        <Input
          label={`${inputLabel} Price`}
          type="text"
          id="price"
          placeholder="0.0000"
          value={price}
          onChange={(e) => priceHandler(e.target.value)}
        />
        <Button className="w-full mt-4" label={btnLabel} type="submit" />
      </form>
    </div>
  );
};

export default OrderForm;
