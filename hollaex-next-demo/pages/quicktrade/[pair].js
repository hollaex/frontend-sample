import React, { useState, useEffect, useContext } from "react";
import { quickTradeService } from "@/services/quicktrade";
import { AuthContext } from "@/provider/AuthProvider";
import PageLayout from "@/components/pagelayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Select from "react-select";
import QuickTradeChart from "@/components/quickTradeChart";
import ReviewModal from "@/components/reviewModal";
import { re } from "mathjs";

const SPENDING = {
  SOURCE: "SOURCE",
  TARGET: "TARGET",
};

const Trade = () => {
  const router = useRouter();
  const pair = router.query.pair;
  const pairCoinFirst = pair?.split("-")[0] || "btc";
  const pairCoinSecond = pair?.split("-")[1] || "usdt";
  const { constantsData, balanceData } = useContext(AuthContext);
  const coins = constantsData?.coins;
  const quickTradeData = constantsData?.quicktrade;
  const [chartData, setChartData] = useState(null);

  const [selectCoinOptions, setSelectCoinOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(selectCoinOptions[0]);
  const [conversionCoinOptions, setConversionCoinOptions] = useState([]);
  const [conversionCrypto, setConversionCrypto] = useState(
    conversionCoinOptions[0]
  );
  const [spendingAmount, setSpendingAmount] = useState(0);
  const [receivingAmount, setReceivingAmount] = useState(0);
  const [quickTradeToken, setQuickTradeToken] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);

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
              className="mr-1.5"
            />
          )}
          {coin?.toUpperCase()}
        </div>
      ),
    }));
  };

  const updateConversionCoinList = () => {
    if (selectedCrypto?.value) {
      const conversionSymbolParts = quickTradeData.filter((obj) =>
        obj.symbol.includes(selectedCrypto.value)
      );
      const filteredConversionSymbolParts = conversionSymbolParts.flatMap(
        (obj) => obj.symbol.split("-")
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
    }
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

  const getBalance = (cryptoName) => {
    if (!balanceData || balanceData.length === 0) {
      return 0;
    }
    const latestBalanceData = balanceData[0]?.balance;
    return latestBalanceData[cryptoName]?.original_value;
  };

  const handleQuickTrade = async () => {
    const amountPayload =
      SPENDING.SOURCE === SPENDING.SOURCE
        ? { spending_amount: spendingAmount }
        : { receiving_amount: receivingAmount };

    const values = {
      ...amountPayload,
      receiving_currency: conversionCrypto.value,
      spending_currency: selectedCrypto.value,
    };
    const response = await quickTradeService.getQuickTrade(values);
    console.log(response);
    setReceivingAmount(response.receiving_amount);
    setQuickTradeToken(response.token);
    setExpiryTime(response.expiry);
  };

  const handleExecuteTrade = async () => {
    const response = await quickTradeService.executeTrade(quickTradeToken);
    console.log(response);
  };

  const getRemainingSeconds = (targetDateTime) => {
    // Parse the target date and time string
    const targetDate = new Date(targetDateTime);
  
    // Get the current time in milliseconds
    const currentTime = Date.now();
  
    // Calculate the difference in milliseconds
    const timeDifference = targetDate - currentTime;
  
    // Ensure the difference is positive (future time)
    if (timeDifference <= 0) {
      return 0;
    }
  
    // Convert the difference to seconds and return the value
    return Math.floor(timeDifference / 1000);
  }

  return (
    <PageLayout>
      <div className="flex h-[75vh] w-[75vw] p-16 text-black">
        {chartData && conversionCrypto && (
          <QuickTradeChart
            selectedCrypto={selectedCrypto}
            conversionCrypto={conversionCrypto}
            chartData={chartData[conversionCrypto?.value]}
          />
        )}
        <div className="w-1/2 bg-white p-8 rounded-r-lg">
          <div className="flex flex-col space-y-4 items-end">
            <a href="/wallet" className="text-blue-500 underline">
              Go to Wallet
            </a>
            <div className="text-left border rounded-lg p-4">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Convert</h2>
                <div>
                  {selectedCrypto?.value?.toUpperCase()} Balance:{" "}
                  <span className="text-blue-500">
                    {getBalance(selectedCrypto?.value)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Select
                  value={selectedCrypto}
                  onChange={handleSlectedCryptoChange}
                  options={selectCoinOptions}
                  className="w-[125px]"
                />
                <input
                  type="number"
                  className="border rounded-md px-2 py-1 focus:outline-none w-[200px]"
                  placeholder="Amount"
                  onChange={(e) => setSpendingAmount(e.target.value)}
                  onBlur={handleQuickTrade}
                  value={spendingAmount}
                />
              </div>
            </div>
            <div className="text-left border rounded-lg p-4">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">To</h2>
                <div>
                  {selectedCrypto?.value?.toUpperCase()} Balance:{" "}
                  <span className="text-blue-500">
                    {getBalance(conversionCrypto?.value)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Select
                  value={conversionCrypto}
                  onChange={handleConversionCryptoChange}
                  options={conversionCoinOptions}
                  className="w-[125px]"
                />
                <input
                  type="number"
                  className="border rounded-md px-2 py-1 focus:outline-none w-[200px]"
                  placeholder="Amount"
                  onChange={(e) => setReceivingAmount(e.target.value)}
                  onBlur={handleQuickTrade}
                  value={receivingAmount}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 mt-8"
                onClick={() => setShowReviewModal(true)}
              >
                Quick Review Trade
              </button>
            </div>
            {selectedCrypto && conversionCrypto && (
              <ReviewModal
                isOpen={showReviewModal}
                onClose={setShowReviewModal}
                onConfirm={handleExecuteTrade}
                duration={getRemainingSeconds(expiryTime)}
                spendAmount={spendingAmount}
                estimatedAmount={receivingAmount}
                spendCurrency={selectedCrypto}
                receiveCurrency={conversionCrypto}
                coinData={constantsData?.coins}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Trade;
