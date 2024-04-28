import React from "react";
import { TradeChart } from "./tradeChart";

const QuickTradeChart = ({ selectedCrypto, conversionCrypto, chartData }) => {
  console.log("chartData", chartData);
  console.log(
    "TP",
    chartData[`${selectedCrypto.value}-${conversionCrypto.value}`]
  );
  return (
    <div className="w-1/2 bg-gray-100 p-4">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">
          {selectedCrypto && selectedCrypto?.value?.toUpperCase()}
        </h2>{" "}
        {chartData && (
          <div className="h-[300px] w-[400px]">
            <TradeChart
              type="line"
              chartData={
                chartData[`${selectedCrypto.value}-${conversionCrypto.value}`]
                  .price
              }
              options={{}}
            />
          </div>
        )}
        <div className="flex justify-between">
          <p>7d High: $45,000</p>
          <p>7d Low: $41,000</p>
        </div>
        <div className="flex justify-between">
          <p>1d High: $44,200</p>
          <p>1d Low: $41,800</p>
        </div>
      </div>
    </div>
  );
};

export default QuickTradeChart;
