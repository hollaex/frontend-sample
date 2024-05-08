import React, { useState, useEffect } from "react";
import { TradeChart } from "./tradeChart";
import {
  getLastValuesFromParts,
  formatPercentage,
  formatToCurrency,
} from "./utils";

const QuickTradeChart = ({ selectedCrypto, conversionCrypto, chartData }) => {
  const coinChartData =
    chartData && chartData[`${selectedCrypto.value}-${conversionCrypto.value}`];

  const [sevenDayData, setSevenDayData] = useState({});
  const [oneDayData, setOneDayData] = useState({});
  const [coinStats, setCoinStats] = useState({});
  const [oneDayChartData, setOneDayChartData] = useState([]);
  const [sevenDayChartData, setSevenDayChartData] = useState([]);
  const [showSevenDay, setShowSevenDay] = useState(false);
  const [chartDataToShow, setChartDataToShow] = useState([]);

  const getPricingData = (price) => {
    const firstPrice = price[0];
    const lastPrice = price[price.length - 1];
    const priceDifference = lastPrice - firstPrice;
    const priceDifferencePercent = formatPercentage(
      (priceDifference / firstPrice) * 100
    );
    const minVal = Math.min(...price);
    const high = Math.max(...price);

    const formattedNumber = (val) =>
      formatToCurrency(val, 0, val < 1 && countDecimals(val) > 8);

    return {
      priceDifference,
      priceDifferencePercent,
      low: formattedNumber(minVal),
      high: formattedNumber(high),
      lastPrice: formattedNumber(lastPrice),
    };
  };

  const getIndexofOneDay = (dates) => {
    const currentTime = new Date().getTime(); // Current time in milliseconds
    const oneDayAgoTime = currentTime - 24 * 60 * 60 * 1000; // Time 24 hours ago in milliseconds

    // Find the index in the dates array that is within the last 24 hours
    const index = dates.findIndex((dateString) => {
      const date = new Date(dateString).getTime(); // Time of each date in the array
      return date > oneDayAgoTime; // Check if the date is within the last 24 hours
    });

    return index;
  };

  useEffect(() => {
    const handleDataUpdate = () => {
      const { price, time } = coinChartData;
      if (price && time) {
        const indexOneDay = getIndexofOneDay(time);
        const oneDayChartPrices = price.slice(indexOneDay, price.length);
        setSevenDayChartData(getLastValuesFromParts(price));
        setSevenDayData(getPricingData(price));
        setOneDayChartData(getLastValuesFromParts(oneDayChartPrices));
        setOneDayData(getPricingData(oneDayChartPrices));
      }
    };

    handleDataUpdate();
  }, [coinChartData, selectedCrypto, conversionCrypto]);

  const handleToggle = () => setShowSevenDay(!showSevenDay);

  const handleCoinData = () => {
    if (showSevenDay) {
      setChartDataToShow(sevenDayChartData);
      setCoinStats(sevenDayData);
    } else {
      setChartDataToShow(oneDayChartData);
      setCoinStats(oneDayData);
    }
  };

  useEffect(() => {
    handleCoinData();
  }, [showSevenDay]);

  useEffect(() => {
    setShowSevenDay(true);
  }, []);

  return (
    <div className="w-1/2 bg-[#e9ecef] p-8 rounded-l-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex w-full justify-between mb-8">
          <h2 className="text-xl font-bold">
            {selectedCrypto && selectedCrypto?.value?.toUpperCase()}
          </h2>
          <div className="flex">
            <span className="text-gray-700 mr-2">1D</span>
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                id="toggle"
                name="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={showSevenDay}
                onChange={handleToggle}
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <span className="text-gray-700 ml-2">7D</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p>Last Price</p>
            <p>{coinStats.lastPrice}</p>
          </div>
          <div>
            <p>{showSevenDay ? "7d" : "1D"} Change</p>
            <p>{coinStats.priceDifferencePercent}</p>
          </div>
        </div>
        {chartData && (
          <div className="h-[200px] w-[350px]">
            <TradeChart
              chartData={
                chartData[`${selectedCrypto.value}-${conversionCrypto.value}`]
                  .price
              }
              options={{}}
            />
          </div>
        )}
        {showSevenDay ? (
          <div className="flex justify-between">
            <div>
              <p>7d High:</p>
              <p>{coinStats.high}</p>
            </div>
            <div>
              <p>7d Low:</p>
              <p>{coinStats.low}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div>
              <p>1d High:</p>
              <p>{coinStats.high}</p>
            </div>
            <div>
              <p>1d Low:</p>
              <p>{coinStats.low}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTradeChart;
