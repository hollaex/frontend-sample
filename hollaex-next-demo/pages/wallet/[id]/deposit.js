import React, { useContext, useEffect, useState, memo } from "react";
import { getNetworkNameByKey } from "@/components/utils";
import { useRouter } from "next/router";
import { AuthContext } from "@/provider/AuthProvider";
import { balanceService } from "@/services/balance";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";
import PageLayout from "@/components/pagelayout";

const DepositPage = () => {
  const router = useRouter();
  const { constantsData, userData } = useContext(AuthContext);
  const [coinId, setCoinId] = useState(router.query.id);
  const [networkCoin, setNetworkCoin] = useState();
  const [networkData, setNetworkData] = useState([]);
  const [depositAddress, setDepositAddress] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [coinBalance, setCoinBalance] = useState(0);

  const coinDetails = constantsData?.coins[coinId];

  const getNetworkData = () => {
    if (coinDetails) {
      const { network } = coinDetails;
      const networks = network?.split(",") || [];
      const networksData = networks.map((coinNet) => ({
        key: coinNet,
        label: getNetworkNameByKey(coinNet),
      }));
      setNetworkCoin(networks[0]);
      setNetworkData(networksData);
    }

    return [];
  };

  useEffect(() => {
    if (userData?.wallet) {
      const walletData = userData.wallet.find(
        (item) => item.currency === coinId && item.network === networkCoin
      );
      if (walletData) {
        setDepositAddress(walletData.address);
      } else {
        setDepositAddress(null);
      }
    }
  }, [userData, coinId, networkCoin]);

  useEffect(() => {
    const { balance } = userData || {};

    balance && setCoinBalance(balance[`${coinId}_available`]);
    balance && setTotalBalance(balance[`${coinId}_balance`]);
  }, []);

  const handleHelpClick = () => {
    // Logic to handle Help link click
  };

  useEffect(() => {
    getNetworkData();
  }, [coinId]);

  useEffect(() => {
    setCoinId(router.query.id);
  }, [router.query.id]);

  const handleGenerateWallet = async () => {
    try {
      const data = await balanceService.getDepositAddress(coinId, networkCoin);
      if (data.address) {
        setDepositAddress(data.address);
        enqueueSnackbar("Wallet generated successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleNetworkSelect = (e) => {
    setNetworkCoin(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    enqueueSnackbar("Address copied to clipboard", {
      variant: "success",
    });
  };

  return (
    <PageLayout>
      <div className="flex justify-center p-20 bg-gray-50 text-black">
        <div className="w-full max-w-screen-lg p-8 bg-white rounded shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex mb-2">
              <Image
                alt={coinDetails?.name}
                src={coinDetails?.logo}
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-3xl font-bold mt-1">
                Deposit {coinDetails?.fullname}
              </h1>
            </div>
            <button onClick={handleHelpClick} className="text-blue-500">
              Need Help?
            </button>
          </div>

          <a href="/wallet" className="text-blue-500">
            Back to Wallet
          </a>
          <p className="my-4">Total Balance: {totalBalance}</p>
          <p className="mb-4">Available Balance: {coinBalance}</p>
          <div className="mb-6">
            <label className="block mb-2">Select Network:</label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleNetworkSelect}
              value={networkCoin}
            >
              {networkData.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            {depositAddress ? (
              <>
                <div className="flex items-center mb-2">
                  <label className="block py-1 mr-2">Deposit Address:</label>
                  <span className="inline-block bg-gray-200 rounded px-3 py-1 mr-2">
                    {depositAddress}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-blue-500 underline uppercase"
                >
                  Copy
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleGenerateWallet}
              >
                Generate Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DepositPage;
