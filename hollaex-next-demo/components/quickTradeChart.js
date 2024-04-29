import React, { useState, useEffect } from "react";
import { TradeChart } from "./tradeChart";
import {
  getLastValuesFromParts,
  formatPercentage,
  formatToCurrency,
} from "./utils";

const QuickTradeChart = ({ selectedCrypto, conversionCrypto, chartData }) => {
  const coinChartData =
    chartData[`${selectedCrypto.value}-${conversionCrypto.value}`];
  console.log(selectedCrypto, conversionCrypto, chartData);

  const [sevenDayData, setSevenDayData] = useState({});
  const [oneDayData, setOneDayData] = useState({});
  const [coinStats, setCoinStats] = useState({});
  const [oneDayChartData, setOneDayChartData] = useState([]);
  const [sevenDayChartData, setSevenDayChartData] = useState([]);
  const [showSevenDay, setShowSevenDay] = useState(true);
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
        setOneDayChartData(getLastValuesFromParts(oneDayChartPrices));
        setOneDayData(getPricingData(oneDayChartPrices));
        setSevenDayChartData(getLastValuesFromParts(price));
        setSevenDayData(getPricingData(price));
      }
    };

    handleDataUpdate();
    //  TODO: Fix react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinChartData, selectedCrypto, conversionCrypto]);

  const handleToggle = () => setShowSevenDay(!showSevenDay);

  useEffect(() => {
    if (showSevenDay) {
      setChartDataToShow(sevenDayChartData);
      setCoinStats(sevenDayData);
    } else {
      setChartDataToShow(oneDayChartData);
      setCoinStats(oneDayData);
    }
  }, [showSevenDay]);

  console.log("oneDayChartData", oneDayChartData);
  console.log("sevenDayChartData", sevenDayChartData);
  console.log("oneDayData", oneDayData);
  console.log("sevenDayData", sevenDayData);
  return (
    <div className="w-1/2 bg-gray-100 p-4">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">
          {selectedCrypto && selectedCrypto?.value?.toUpperCase()}
        </h2>
        <div className="flex justify-between items-center">
          <label htmlFor="toggle">View:</label>
          <div className="relative inline-block w-10 mr-4">
            <input
              type="checkbox"
              id="toggle"
              name="toggle"
              checked={showSevenDay}
              onChange={handleToggle}
            />
            <span className="absolute block bg-gray-400 rounded-full w-6 h-6 cursor-pointer"></span>
            <span className="relative text-left pl-3">
              {showSevenDay ? "7d" : "1d"}
            </span>
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
          <div className="h-[300px] w-[400px]">
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
