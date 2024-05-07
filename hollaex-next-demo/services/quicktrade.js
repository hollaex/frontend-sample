import { api } from "./axios";
import queryString from "query-string";
import { enqueueSnackbar } from "notistack";

class QuickTradeService {
  async getCharts(pairs, quote = "usdt") {
    const data = await api.get(`/minicharts?assets=${pairs}&quote=${quote}`);

    const result = {};

    Object.keys(data).forEach((keyVal) => {
      data[keyVal].forEach(({ price, quote, symbol, time }) => {
        let symbolKey = symbol + "-" + quote;

        if (!result[symbolKey]) {
          result[symbolKey] = {
            price: [],
            time: [],
          };
        }

        result[symbolKey].price.push(price);
        result[symbolKey].time.push(time);
      });
    });

    return result;
  }

  async getQuickTrade(values) {
    try {
      const data = await api.get(
        `/quick-trade?${queryString.stringify(values)}`
      );
      return data;
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 400) {
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("API request failed. Please try again later.", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("An unexpected error occurred.", {
          variant: "error",
        });
      }
    }
  }

  async executeTrade(token) {
    const data = await api.post("/order/execute", { token });

    return data;
  }
}

export const quickTradeService = new QuickTradeService();
