import React, { useState, useEffect, useContext } from "react";
import { quickTradeService } from "@/services/quicktrade";
import { AuthContext } from "@/provider/AuthProvider";
import Chart from "react-chartjs-2";

const Trade = () => {
  const { constantsData } = useContext(AuthContext);
  const coins = constantsData?.coins;
  const quickTradeData = constantsData?.quicktrade;
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [chartData, setChartData] = useState(null);

  const fetchChartData = async (base="usdt") => {
    if (!coins) {
      return;
    }
    const fetchChartData = await quickTradeService.getCharts(
      Object.keys(coins).toLocaleString(), base
    );
    setChartData(fetchChartData);
  };

  console.log("chartData", quickTradeData);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-full flex">
        <div className="w-1/2 bg-gray-100 p-4">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">
              {selectedCrypto.toUpperCase()}
            </h2>
            {/*<div className="h-40">
            {chartData && <Chart type="line" data={chartData} options={{}} />}
          </div>
  */}
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
        <div className="w-1/2 bg-white p-4">
          {/* Trade section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">
              Convert {selectedCrypto.toUpperCase()}
            </h2>
            <div className="flex space-x-4">
              <select
                className="border rounded-md px-2 py-1 focus:outline-none"
                value={selectedCrypto}
                onChange={handleCryptoChange}
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
              </select>
              <input
                type="number"
                className="border rounded-md px-2 py-1 focus:outline-none"
                placeholder="Amount"
              />
            </div>
            <h2 className="text-xl font-bold">
            To {selectedCrypto.toUpperCase()}
          </h2>
          <div className="flex space-x-4">
            <select
              className="border rounded-md px-2 py-1 focus:outline-none"
              value={selectedCrypto}
              onChange={handleCryptoChange}
            >
              <option value="bitcoin">Bitcoin (BTC)</option>
              <option value="ethereum">Ethereum (ETH)</option>
            </select>
            <input
              type="number"
              className="border rounded-md px-2 py-1 focus:outline-none"
              placeholder="Amount"
            />
          </div>
            
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700">
              Quick Review Trade
            </button>
            <a href="/wallet" className="text-blue-500 underline">
              Go to Wallet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
