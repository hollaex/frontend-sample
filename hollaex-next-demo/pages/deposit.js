import React from 'react';

const DepositPage = () => {
    // Dummy data for coin details
    const coinDetails = {
        name: 'Bitcoin',
        totalBalance: 10.5,
        availableBalance: 5.5,
        networks: ['BTC', 'ETH', 'BSC', 'SOL'], // Example list of networks
    };

    const handleHelpClick = () => {
        // Logic to handle Help link click
        // Open modal or navigate to help page
    };

    return (
        <div className="flex justify-center p-12 h-screen bg-gray-50 text-black">
            <div className="w-full max-w-screen-lg p-8 bg-white rounded shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{coinDetails.name} Deposit</h1>
                    <button onClick={handleHelpClick} className="text-blue-500">Need Help?</button>
                </div>
                <p className="mb-4">Total Balance: {coinDetails.totalBalance}</p>
                <p className="mb-4">Available Balance: {coinDetails.availableBalance}</p>
                <div className="mb-6">
                    <label className="block mb-2">Select Network:</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                        {coinDetails.networks.map(network => (
                            <option key={network} value={network}>{network}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Deposit</button>
                    <a href="/balance" className="text-blue-500">Back to Wallet</a>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
