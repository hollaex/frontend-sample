import React, { createContext, useEffect, useState } from "react";
import { authService } from "@/services/auth";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { api } from "@/services/axios";
import { balanceService } from "@/services/balance";
import { userService } from "@/services/user";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [constantsData, setConstantsData] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const logout = () => {
    authService.logout();
    localStorage.setItem("hconstants", null);
    setUserToken(null);
    router.push('/login');
  };

  const getBalance = async () => {
    try {
      if (!balanceData) {
        const date = new Date();
        const formattedDate = date.toISOString();
        const balanceResult = await balanceService.getBalance(
          formattedDate,
          formattedDate
        );
        setBalanceData(balanceResult.data);
      }
    } catch (e) {
      enqueueSnackbar(e, {
        variant: "error",
      });
    }
  };

  const getUserData = async () => {
    try {
      if (!userData) {
        const userResult = await userService.getUserData();
        setUserData(userResult);
      }
    } catch (e) {
      enqueueSnackbar(e, {
        variant: "error",
      });
    }
  }

  useEffect(() => {
    if (!constantsData) {
      setConstantsData(JSON.parse(localStorage.getItem("hconstants")));
      getUserData();
      getBalance();
    }
  }, [constantsData]);

  const getConstantsData = async () => {
    if (typeof window !== "undefined") {
      const constants = await balanceService.getConstants();
      localStorage.setItem("hconstants", JSON.stringify(constants));
      setConstantsData(constants);
      getBalance();
    }
  };

  const login = async (email, password) => {
    try {
      const loginData = await authService.login(email, password);
      if (loginData.token) {
        localStorage.setItem("authToken", loginData.token);
        await api.setAuthorizationHeaders(loginData.token);
        setUserToken(loginData.token);
        getConstantsData();
        router.push("/wallet");
      }
    } catch (error) {
      enqueueSnackbar("Invalid Email or Password! Please try again!", {
        variant: "error",
      });
    }
  };

  const values = {
    login,
    logout,
    userToken,
    constantsData,
    setConstantsData,
    balanceData,
    userData,
  };

  return (
    <AuthContext.Provider value={values}> {children}</AuthContext.Provider>
  );
};

export default AuthProvider;
