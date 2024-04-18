import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/pagelayout";
import Image from "next/image";
import { AuthContext } from "@/provider/AuthProvider";

const BalancePage = () => {
  const { constantsData, balanceData } = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [coinList, setCoinList] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  const updateCoinList = ({ balance }) => {
    const resArr = [];
    let amt = 0;

    Object.keys(balance).map((key) => {
      const { native_currency_value, original_value } = balance[key];
      const coinData = constantsData?.coins[key];
      amt += native_currency_value;
      resArr.push({
        id: key,
        name: coinData?.fullname,
        logo: coinData?.logo,
        amount: original_value,
      });
    });

    setCoinList(resArr);
    setFilteredCoins(resArr);
    setTotalBalance(amt);
  };

  useEffect(() => {
    balanceData?.length && updateCoinList(balanceData[0]);
  }, [balanceData]);

  const handleOnChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredCoins = coinList.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue)
    );

    setFilteredCoins(filteredCoins);
  };

  return (
    <PageLayout>
      <div className="flex justify-center h-screen w-[80vw] text-black bg-gray-50">
        <div className="w-full p-8 bg-white rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-6">
            Total Balance: {totalBalance.toFixed(2)} USDT
          </h1>
          <input
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
            type="text"
            placeholder="Search currencies..."
            onChange={handleOnChange}
          />
          <table className="w-full border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-left">Currency</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Amount</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((currency) => (
                <tr key={currency.id}>
                  <td className="py-2 px-4 flex">
                    <Image
                      alt={currency.name}
                      src={currency.logo}
                      width={25}
                      height={25}
                      className="mr-3"
                    />
                    {currency.name}
                  </td>
                  <td className="py-2 px-4">{currency.amount}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`./wallet/${currency.id}/deposit`}
                      className="text-blue-500 cursor-pointer"
                    >
                      <button className="px-3 py-1 mr-2 border border-blue-800 text-blue-800 rounded-md cursor-pointer">
                        Deposit
                      </button>
                    </Link>
                    <button className="px-3 py-1 border border-red-500 text-red-500 rounded-md">
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default BalancePage;
