import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TfiReload } from "react-icons/tfi";
import { useExchangeStore, useTokensStore, useUserStore } from "../store";
import { Transaction as TransactionType } from "../store/useTokensStore";
import { Transaction as OrderType } from "../store/useExchangeStore";
import { sortUserEvents } from "../store/utils";
import config from "../store/config.json";

import { Button } from ".";

const Alert = () => {
  let [isOpen, setIsOpen] = useState(false);

  const { account, chainId } = useUserStore();
  const { transaction: tokenTransaction, events: tokenEvents } =
    useTokensStore();
  const { transaction: exchangeTransaction, events: exchangeEvents } =
    useExchangeStore();

  const { events } = sortUserEvents(account, tokenEvents, exchangeEvents);

  const {
    isPending: isExchangePending,
    isSuccessful: isExchangeSuccessful,
    isError: isExchangeError,
  } = exchangeTransaction as OrderType;
  const {
    isPending: isTokenPending,
    isSuccessful: isTokenSuccessful,
    isError: isTokenError,
  } = tokenTransaction as TransactionType;

  const isPending = isExchangePending || isTokenPending;
  const isSuccessful = isExchangeSuccessful || isTokenSuccessful;
  const isError = isExchangeError || isTokenError;

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if ((isPending || isError) && account) setIsOpen(true);
  }, [isPending, isError, account]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border-2 border-primary dark:border-primaryDark bg-light dark:bg-dark p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium text-dark dark:text-light text-center"
                >
                  {isPending ? (
                    <div className="flex justify-center items-center">
                      Transaction Pending
                      <span className="ml-4 animate-spin">
                        <TfiReload size={16} />
                      </span>
                    </div>
                  ) : (
                    "Transaction Successful"
                  )}
                  {isError && "Transaction Will Fail"}
                </Dialog.Title>
                {!isPending && !isError && (
                  <div className="mt-2 text-center">
                    <a
                      className="hover:opacity-60 cursor-pointer transition duration-300 focus:outline-none"
                      href={
                        // @ts-ignore
                        config[chainId]
                          ? // @ts-ignore
                            `${config[chainId].explorerURL}/tx/${events[0]?.transactionHash}`
                          : `#`
                      }
                      target="_blank"
                    >
                      {`${events[0]?.transactionHash.slice(
                        0,
                        6
                      )}...${events[0]?.transactionHash.slice(60, 66)}`}
                    </a>
                  </div>
                )}
                {!isPending && (
                  <div className="mt-4 flex justify-center">
                    <Button
                      className="focus:outline-none"
                      label="Close"
                      onClick={closeModal}
                    />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Alert;
