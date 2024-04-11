import React, { createContext, useState } from "react";
import { authService } from "@/services/auth";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { api } from "@/services/axios";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const router = useRouter();

  const logout = () => {
    authService.logout();
    setUserToken(null);
    router.reload();
  };

  const login = async (email, password) => {
    try {
      const loginData = await authService.login(email, password);
      if (loginData.token) {
        localStorage.setItem('authToken', loginData.token);
        await api.setAuthorizationHeaders(loginData.token);
        setUserToken(loginData.token);
        router.push("/balance");
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
  };

  return (
    <AuthContext.Provider value={values}> {children}</AuthContext.Provider>
  );
};

export default AuthProvider;
