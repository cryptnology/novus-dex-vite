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
    <div className="bg-secondary dark:bg-secondaryDark rounded-xl p-5">
      {account ? (
        <>
          {" "}
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
          <div className="h-full w-full text-dark dark:text-light">
            <Chart
              type="candlestick"
              options={options}
              series={series || []}
              width="100%"
              height="100%"
            />
          </div>
        </>
      ) : (
        <Banner className="text-lg lg:text-xl" />
      )}
    </div>
  );
};

export default PriceChart;
