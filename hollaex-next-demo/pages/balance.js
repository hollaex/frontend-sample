import React from "react";
import Link from "next/link";

const BalancePage = () => {
  // Dummy data for currencies
  const currencies = [
    { id: 1, name: "Bitcoin", amount: 0.5 },
    { id: 2, name: "Ethereum", amount: 2.3 },
    // Add more currencies as needed
  ];

  // Calculate total balance in USDT
  const totalBalanceUSDT = currencies.reduce((total, currency) => {
    // Dummy conversion rate from currency to USDT
    const conversionRate = 50000; // Example conversion rate
    return total + currency.amount * conversionRate;
  }, 0);

  return (
    <div className="flex justify-center p-12 h-screen text-black bg-gray-50">
      <div className="w-full p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Total Balance: {totalBalanceUSDT} USDT
        </h1>
        <input
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
          type="text"
          placeholder="Search currencies..."
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
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td className="py-2 px-4">{currency.name}</td>
                <td className="py-2 px-4">{currency.amount}</td>
                <td className="py-2 px-4">
                  <Link href="/deposit" className="text-blue-500 cursor-pointer">
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
  );
};

export default BalancePage;
