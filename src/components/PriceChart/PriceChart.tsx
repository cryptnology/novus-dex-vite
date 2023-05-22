import Chart from "react-apexcharts";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { useExchangeStore, useTokensStore, useUserStore } from "../../store";
import { sortPriceChartOrders } from "../../store/utils";

import { options } from "./PriceChart.config";
import { Banner } from "..";

const PriceChart = () => {
  const { account } = useUserStore();
  const { contracts: tokens } = useTokensStore();
  const { filledOrders } = useExchangeStore();

  const { series, lastPrice, lastPriceChange } = sortPriceChartOrders(
    filledOrders,
    tokens
  );

  return (
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl p-5 h-[420px]">
      {account && series[0].data.length > 0 ? (
        <>
          <div className="flex items-center mb-3">
            <h2 className="font-bold text-lg text-dark dark:text-light transition mr-3">{`${tokens[0]?.symbol} / ${tokens[1]?.symbol}`}</h2>
            {lastPriceChange === "+" ? (
              <HiTrendingUp
                className="text-green-600 dark:text-green-400 transition"
                size={28}
              />
            ) : (
              <HiTrendingDown
                className="text-red-600 dark:text-red-500 transition"
                size={28}
              />
            )}
            <span className="font-bold text-lg text-dark dark:text-light transition ml-3">
              {lastPrice}
            </span>
          </div>
          <div className="text-dark dark:text-light bg-light rounded-xl dark:bg-dark transition">
            <Chart
              type="candlestick"
              options={options}
              series={series || []}
              width="100%"
              height="320px"
            />
          </div>
        </>
      ) : (
        <div className="text-dark dark:text-light bg-light rounded-xl dark:bg-dark transition h-full">
          <Banner
            title={
              !account ? "Please connect to MetaMask" : "No transactional data"
            }
            className="text-lg lg:text-xl"
          />
        </div>
      )}
    </div>
  );
};

export default PriceChart;
