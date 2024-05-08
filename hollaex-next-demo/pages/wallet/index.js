import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/pagelayout";
import Image from "next/image";
import { AuthContext } from "@/provider/AuthProvider";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  TableBody,
  TableContainer,
} from "@mui/material";
import { NorthWest, SouthEast } from "@mui/icons-material";

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
  }, [balanceData, constantsData]);

  const handleOnChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredCoins = coinList.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue)
    );

    setFilteredCoins(filteredCoins);
  };

  return (
    <PageLayout>
      <div className="flex justify-center h-[90vh] w-[80vw] text-black bg-gray-50">
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
          <TableContainer sx={{ maxHeight: "70vh", overflowY: "auto" }} className="border rounded-lg">
            <Table stickyHeader className="w-full border border-gray-300 rounded-lg">
              <TableHead className="rounded-lg">
                <TableRow>
                  <TableCell className="bg-gray-100 text-left font-semibold">
                    Currency
                  </TableCell>
                  <TableCell className="bg-gray-100 text-left font-semibold">
                    Amount
                  </TableCell>
                  <TableCell className="bg-gray-100 text-left font-semibold">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredCoins.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell className="">
                      <Box className="flex items-center">
                        <Image
                          alt={currency?.name || "Fallback"}
                          src={currency?.logo || "/fallback.png"}
                          width={25}
                          height={25}
                          className="mr-3 -mt-1"
                        />
                        {currency.name}
                      </Box>
                    </TableCell>
                    <TableCell className="px-4">{currency.amount}</TableCell>
                    <TableCell className="flex w-full">
                      <Box className="mr-4">
                      <Button
                        variant="outlined"
                        className="border border-blue-800 text-blue-800 rounded-md"
                        startIcon={<SouthEast />}
                      >
                        <Link
                          href={`./wallet/${currency.id}/deposit`}
                          className="text-blue-500 cursor-pointer"
                        >
                          Deposit
                        </Link>
                      </Button>
                      </Box>
                      <Box>
                      <Button
                        variant="outlined"
                        className="border border-green-800 text-green-800 rounded-md"
                        startIcon={<NorthWest />}
                      >
                        Withdraw
                      </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default BalancePage;
