import React, { useState, useEffect, useContext } from "react";
import { quickTradeService } from "@/services/quicktrade";
import { AuthContext } from "@/provider/AuthProvider";
import PageLayout from "@/components/pagelayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Select from "react-select";
import QuickTradeChart from "@/components/quickTradeChart";

const Trade = () => {
  const router = useRouter();
  const pair = router.query.pair;
  const pairCoinFirst = pair?.split("-")[0] || "btc";
  const pairCoinSecond = pair?.split("-")[1] || "usdt";
  const { constantsData } = useContext(AuthContext);
  const coins = constantsData?.coins;
  const quickTradeData = constantsData?.quicktrade;
  const [chartData, setChartData] = useState(null);

  const [selectCoinOptions, setSelectCoinOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(selectCoinOptions[0]);
  const [conversionCoinOptions, setConversionCoinOptions] = useState([]);
  const [conversionCrypto, setConversionCrypto] = useState(
    conversionCoinOptions[0]
  );

  useEffect(() => {
    const updatedPair = router.query.pair;
    if (updatedPair) {
      const pairCoins = updatedPair?.split("-");
      setSelectedCrypto(
        selectCoinOptions.find((coin) => coin.value === pairCoins[0])
      );

      setConversionCrypto(
        conversionCoinOptions.find((coin) => coin.value === pairCoins[1])
      );
    }
  }, [pair, selectCoinOptions, conversionCoinOptions]);

  const getOptionsDom = (coinList) => {
    return coinList.map((coin) => ({
      value: coin,
      label: (
        <div className="flex">
          {coins[coin]?.logo && (
            <Image
              src={coins[coin]?.logo}
              alt={coin}
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          {coin?.toUpperCase()}
        </div>
      ),
    }));
  };

  const updateConversionCoinList = () => {
    const conversionSymbolParts = quickTradeData.filter((obj) =>
      obj.symbol.includes(selectedCrypto.value)
    );
    const filteredConversionSymbolParts = conversionSymbolParts.flatMap((obj) =>
      obj.symbol.split("-")
    );

    const conversionUniqueValues = new Set(filteredConversionSymbolParts);
    const updatedConversionValues = Array.from(conversionUniqueValues).filter(
      (item) => item !== selectedCrypto.value
    );
    const conversionOptions = getOptionsDom(updatedConversionValues);

    setConversionCoinOptions(conversionOptions);
    setConversionCrypto(
      conversionOptions.find((coin) => coin.value === pairCoinSecond)
    );
  };

  const getCoinOptions = () => {
    const symbolParts = quickTradeData.flatMap((obj) => obj.symbol.split("-"));
    const uniqueValues = new Set(symbolParts);
    const coinOptions = getOptionsDom(Array.from(uniqueValues));

    setSelectCoinOptions(coinOptions);
    setSelectedCrypto(coinOptions.find((coin) => coin.value === pairCoinFirst));
  };

  const fetchChartData = async () => {
    if (
      !coins ||
      (!conversionCrypto && !conversionCrypto?.value) ||
      (chartData &&
        conversionCrypto?.value &&
        chartData[conversionCrypto.value])
    ) {
      return;
    }
    const fetchChartData = await quickTradeService.getCharts(
      Object.keys(coins).toLocaleString(),
      conversionCrypto.value
    );
    setChartData((prev) => ({
      ...prev,
      [conversionCrypto.value]: fetchChartData,
    }));
  };

  const handleSlectedCryptoChange = (selectedOption) => {
    setSelectedCrypto(selectedOption);
    setChartData({});
  };

  const handleConversionCryptoChange = (selectedOption) => {
    setConversionCrypto(selectedOption);
    setChartData({});
  };

  useEffect(() => {
    quickTradeData && updateConversionCoinList();
  }, [selectedCrypto]);

  useEffect(() => {
    fetchChartData();
  }, [conversionCrypto]);

  useEffect(() => {
    selectedCrypto?.value &&
      conversionCrypto?.value &&
      router.push(
        `/quicktrade/${selectedCrypto.value}-${conversionCrypto.value}`,
        undefined,
        { shallow: true }
      );
  }, [selectedCrypto, conversionCrypto]);

  useEffect(() => {
    quickTradeData && coins && getCoinOptions();
  }, [quickTradeData, coins]);

  return (
    <PageLayout>
      <div className="flex h-[600px] w-full text-black">
        {chartData && conversionCrypto && (
          <QuickTradeChart
            selectedCrypto={selectedCrypto}
            conversionCrypto={conversionCrypto}
            chartData={chartData[conversionCrypto?.value]}
          />
        )}
        <div className="w-1/2 bg-white p-4">
          {/* Trade section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">Convert</h2>
            <div className="flex space-x-4">
              <Select
                value={selectedCrypto}
                onChange={handleSlectedCryptoChange}
                options={selectCoinOptions}
              />
              <input
                type="number"
                className="border rounded-md px-2 py-1 focus:outline-none"
                placeholder="Amount"
              />
            </div>
            <h2 className="text-xl font-bold">To</h2>
            <div className="flex space-x-4">
              <Select
                value={conversionCrypto}
                onChange={handleConversionCryptoChange}
                options={conversionCoinOptions}
              />
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
    </PageLayout>
  );
};

export default Trade;
