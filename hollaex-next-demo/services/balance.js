import { api } from "./axios";

class BalanceService {
  async getBalance(start_date, end_date) {
    const data = await api.get('/user/balance-history', { start_date, end_date });
    return data;
  }

  async getConstants() {
    const data = await api.get('/constants');
    return data;
  }

  async getDepositAddress(coin, network) {
    const data = await api.get(`/user/create-address?crypto=${coin}&network=${network}`);
    return data;
  }
}

export const balanceService = new BalanceService();
