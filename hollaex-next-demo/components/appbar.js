import React from "react";
import Link from "next/link";
import Logo from "./logo";

const AppBar = ({ hideMenu }) => {
  return (
    <div className="bg-gray-900 text-white py-4 px-6 flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          <Logo height={40} width={40} />
        </Link>
      </div>
      {!hideMenu && (
        <>
          <div className="flex items-center space-x-6">
            <Link href="/balance" className="hover:text-gray-400">
              Wallet
            </Link>
            <Link href="/quicktrade" className="hover:text-gray-400">
              Quick Trade
            </Link>
          </div>
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex justify-center items-center">
                <span className="text-sm">P</span>
              </div>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden">
              <ul className="py-1">
                <li>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Profile
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Settings
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppBar;